import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getRenderData } from "../../../slices/SiteData";
import { useMemo } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import { useState } from "react";
import Loader from "../../../components/loader/Loader";
import { Button } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
};

export default function DeleteSiteModal({
  openDeleteModal,
  setOpenDeleteModal,
  id,
}) {
  const dispatch = useDispatch();

  const deleteSiteData = async (id) => {
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
        `${base_url}delete-site/?id=${id}`,
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
              <p>
                Êtes-vous sûr(e) de vouloir supprimer cet élément ? Cette action
                ne peut pas être annulée
              </p>

              <div className="btns">
                <Button
                  color="error"
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteSiteData(id);
                    setTimeout(() => {
                      handleClose();
                    }, [500]);
                  }}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
