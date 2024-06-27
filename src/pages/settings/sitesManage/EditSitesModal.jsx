import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AiOutlineSend } from "react-icons/ai";
import "../modals/style.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { useState, useMemo } from "react";
import SuccessModal from "../modals/SuccessModal";
import { getRenderData } from "../../../slices/SiteData";
import { render } from "react-dom";
import { Button, DialogActions } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // border: "2px solid transparent",
  boxShadow: 24,
  width: 600,
  // p: 1,
};

export default function EditSitesModal({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let inputs = useSelector((state) => state.toggleLeftBar.inputs);

  let siteId = useSelector((state) => state.getSiteData.siteId);
  let siteName = useSelector((state) => state.getSiteData.siteName);
  let sitePhone = useSelector((state) => state.getSiteData.sitePhone);

  const disptach = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  let siteNameRef = useRef();
  let sitePhoneRef = useRef();

  if (inputs) {
    siteNameRef.current.value = "";
    sitePhoneRef.current.value = "";
  }
  const sendData = () => {
    let siteData = {
      id: siteId,
      name: siteNameRef.current.value,
      phone: sitePhoneRef.current.value,
    };

    if (siteData.name.trim() && siteData.phone.trim()) {
      UpdateSiteData(siteData);
    } else {
      setAlert(true);
    }
  };

  // * updating Sites
  const UpdateSiteData = async (data) => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}update-site/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const datas = await response.json();
      console.log(datas);
      if (response.ok) {
        setMessage("Vos modifications ont été enregistrées.");
      } else {
        data = {};
        const errorMessage = "Site existe déjà";
        throw new Error(errorMessage);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="edit-modal">
            <div className="edit-site slit-in-horizontal">
              {isModalOpen && (
                <SuccessModal
                  open={isModalOpen}
                  setOpen={setIsModalOpen}
                  onClose={handleClose}
                  message={"Vos données ont été enregistrées avec succès."}
                />
              )}
              <form className="settings-form">
                <p className="title">Modifier</p>

                <label>
                  <input
                    required
                    ref={siteNameRef}
                    id="siteName"
                    className="input"
                    type="text"
                    placeholder=" "
                    defaultValue={siteName}
                  />
                  <span> Site*</span>
                </label>
                <label>
                  <input
                    required
                    ref={sitePhoneRef}
                    id="sitePhone"
                    className="input"
                    type="text"
                    placeholder=""
                    defaultValue={sitePhone}
                  />
                  <span>Télephone*</span>
                </label>

                <DialogActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      sendData();
                      setIsModalOpen(true);
                    }}
                    autoFocus
                    variant="contained"
                    color="success"
                  >
                    Enregistrer
                  </Button>
                </DialogActions>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
