import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import SuccessModal from "../../../../pages/settings/modals/SuccessModal";
let base_url = "https://farmdriver.savas.ma/api/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  width: 600,
};

export default function EditModal({ siteName, open, setOpen }) {
  const disable = true;
  let batId = useSelector((state) => state.getSiteData.batId);
  let batName = useSelector((state) => state.getSiteData.batName);
  let batType = useSelector((state) => state.getSiteData.batType);
  let batSite = useSelector((state) => state.getSiteData.batSite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batimentType, setBatimentType] = useState("");
  let inputs = useSelector((state) => state.toggleLeftBar.inputs);

  const newSiteName = siteName.filter((site) => site.id !== batSite);
  const currentSiteName = siteName.filter((site) => site.id === batSite);

  let batmntRef = useRef();
  let siteNameRef = useRef();
  let typeRef = useRef();

  if (inputs) {
    batmntRef.current.value = "";
    siteNameRef.current.value = "";
    typeRef.current.value = "";
  }
  const sendData = () => {
    let batimentData = {
      bat_id: batId,
      name: batmntRef.current.value,
      site_id: siteNameRef.current.value,
      type: typeRef.current.value,
    };

    if (
      batimentData.name.trim() &&
      batimentData.site_id &&
      batimentData.type.trim()
    ) {
      UpdateBatimentData(batimentData);
    }
  };

  const handleClose = () => setOpen(false);

  // * Updating Bâtiments
  const UpdateBatimentData = async (data) => {
    // console.log(data);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}update-batmnt/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        console.log("Vos modifications ont été enregistrées.");
        setIsModalOpen(true);
      } else {
        data = {};
        const errorMessage = "Bâtiment existe déjà";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error.message);
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
              )}{" "}
              <form className="settings-form">
                <p className="title">Modifier bâtiment</p>
                <label>
                  <input
                    ref={batmntRef}
                    id="batiment"
                    className="input"
                    type="text"
                    placeholder=" "
                    defaultValue={batName}
                    required={true}
                    // onFocus={() => dispatch(clearInputs(false))}
                  />
                  <span> Bâtiment*</span>
                </label>
                <label>
                  <input
                    ref={typeRef}
                    id="production"
                    className="input"
                    disabled={disable}
                    defaultValue={batType}
                    // onChange={(e) => setBatimentType(e.target.value)}
                    // onFocus={() => dispatch(clearInputs(false))}
                  >
                    {/* <option
                      value={
                        batType == "production" ? "Production" : "Poussiniere"
                      }
                    >
                      {batType == "production" ? "Production" : "Poussiniere"}
                    </option>
                    <option
                      value={
                        batType !== "production" ? "Production" : "Poussiniere"
                      }
                    >
                      {batType !== "production" ? "Production" : "Poussiniere"}
                    </option> */}
                  </input>
                  {/* <span> Production/Poussiniere*</span> */}
                </label>

                <label>
                  <input
                    required
                    ref={siteNameRef}
                    id="siteNames"
                    className="input"
                    disabled={disable}
                    defaultValue={currentSiteName.map((site) => site?.name)}
                    // onFocus={() => dispatch(clearInputs(false))}
                    // onChange={(e) => SetSite(e.target.value)}
                  >
                    {/* {currentSiteName.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))}
                    {newSiteName.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))} */}
                  </input>
                  {/* <span>Sites*</span> */}
                </label>
                <div className="btns">
                  <button
                    type=""
                    className="edit-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      sendData();
                    }}
                  >
                    <div className="svg-wrapper-1">
                      <div className="svg-wrapper">
                        <AiOutlineSend />
                      </div>
                    </div>
                    <span>Envoyer</span>
                  </button>
                  <button
                    type=""
                    className="cancel-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  >
                    <span>Annuler</span>
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
