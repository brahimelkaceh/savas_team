import * as React from "react";
import { Box, IconButton, Modal, SvgIcon } from "@mui/material";
import UpdateProphylaxi from "./UpdateProphylaxi";
import { Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  boxShadow: 24,
};

let base_url = "https://farmdriver.savas.ma/api/";

export default function EditProphylaxi({ id, reftching, lotId }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (lotId) => {
    try {
      setLoading(true);
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }
      const accessToken = authTokens.access;

      const response = await fetch(
        `${base_url}prefilled-prophylaxis-program/?id=${lotId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const fetchedData = await response.json();
      if (response.ok) {
        console.log(fetchedData);
        setData(fetchedData);
        setError("");
      } else {
        setError("Introuvable");
        setData([]);
      }
    } catch (error) {
      setError("Introuvable");
      setData([]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  // useEffect(() => {
  //   fetchData(lotID);
  // }, [lotID]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          handleClickOpen();
          fetchData(id);
          console.log(id);
        }}
        size="small"
        color="warning"
      >
        <SvgIcon>
          <Edit />
        </SvgIcon>
      </IconButton>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
          <UpdateProphylaxi
            onClose={handleClose}
            id={id}
            data={data}
            loading={loading}
            reftching={reftching}
            lotId={lotId}
          />
        </Box>
      </Modal>
    </>
  );
}
