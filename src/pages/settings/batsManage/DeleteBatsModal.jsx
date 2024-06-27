import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRenderData } from "../../../slices/SiteData";
import { Button, DialogActions } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
};

export default function DeleteBatsModal({
  openDeleteModal,
  setOpenDeleteModal,
  id,
}) {
  let renderData = useSelector((state) => state.getSiteData.renderData);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const deleteBatiment = async (id) => {
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
        `${base_url}delete-bat/?id=${id}`,
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
              <p>
                Êtes-vous sûr(e) de vouloir supprimer cet élément ? Cette action
                ne peut pas être annulée
              </p>

              <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  Annuler
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteBatiment(id);
                    dispatch(getRenderData(!renderData));

                    setTimeout(() => {
                      handleClose();
                    }, [200]);
                  }}
                  autoFocus
                  variant="contained"
                  color="error"
                >
                  Supprimer
                </Button>
              </DialogActions>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
