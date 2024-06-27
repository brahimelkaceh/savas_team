import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getRenderData } from "../../../slices/SiteData";
let base_url = "https://farmdriver.savas.ma/api/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid transparent",
};

export default function DeleteUsersModal({
  openDeleteModal,
  setOpenDeleteModal,
  id,
}) {
  let renderData = useSelector((state) => state.getSiteData.renderData);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const deleteUserData = async (id) => {
    setLoading(true);
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }

      const accessToken = authTokens.access;
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${base_url}delete-user/?id=${id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Assuming dispatch is a function to handle state updates
      dispatch(getRenderData(new Date().toISOString()));
    } catch (error) {
      console.error("Error deleting user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setOpenDeleteModal(false);

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
                    deleteUserData(id);
                    setTimeout(() => {
                      handleClose();
                    }, [500]);
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
