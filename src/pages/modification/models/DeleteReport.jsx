import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { getRefreshData, getRenderData } from "../../../slices/SiteData";
import { useSelector, useDispatch } from "react-redux";
let base_url = "https://farmdriver.savas.ma/api/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid transparent",
};

export default function DeleteReport({ openDeleteModal, setOpenDeleteModal }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.editReport.id);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpenDeleteModal(false);
  const deleteReport = async (id) => {
    setLoading(true);

    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }

      const accessToken = authTokens.access;
      const response = await fetch(`${base_url}delete-report/?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      if (response.ok) {
        handleClose();
        dispatch(getRefreshData(new Date().toString()));
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDeleteModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteModal}>
          <Box sx={style} className="edit-modal ">
            <div style={{}} className="delete-modal slit-in-horizontal">
              {/* <h1> Attention</h1> */}
              <p>
                La suppression de cet élément le supprimera définitivement du
                système. Voulez-vous vraiment continuer ?
              </p>
              <div className="btns">
                <button
                  type=""
                  className="delete-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteReport(id);
                  }}
                >
                  {/* <div className="svg-wrapper-1"> */}
                  {/* <div className="svg-wrapper"> */}
                  <AiFillDelete />
                  {/* </div>
                </div> */}
                  <span>Supprimer</span>
                </button>
                <button
                  type=""
                  className="cancel-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                    // sendData();
                  }}
                >
                  <span>Annuler</span>
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
