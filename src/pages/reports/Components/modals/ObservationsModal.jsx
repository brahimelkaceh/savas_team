import * as React from "react";
import Box from "@mui/material/Box";
import { Button, DialogActions, Typography } from "@mui/material";
import { AiOutlineSend } from "react-icons/ai";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  boxShadow: 24,
  p: 2,
  textAlign: "left",
};

export default function ObservationsModal({
  setOpen,
  open,
  onSubmit,
  observationobjects,
  date,
  lotId,
}) {
  const handleClose = () => {
    setOpen(false);
    // console.log(editModal);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
        onClose={handleClose}
      >
        <Box sx={style} className="confirm-modal ">
          <Typography id="modal-modal-title" variant="p" component="h4" mb={1}>
            Êtes-vous sûr de vouloir envoyer ces données ?
          </Typography>

          {observationobjects?.map((data, index) => {
            return (
              <div
                className="observation-box "
                key={index}
                style={{ marginBottom: "5px" }}
              >
                <div
                  className={
                    data.urg == 1
                      ? "good-container"
                      : data.urg == 2
                      ? "warning-container"
                      : data.urg == 3
                      ? "danger-container"
                      : "info-container"
                  }
                >
                  <div
                    className={
                      data.urg == 1
                        ? "good"
                        : data.urg == 2
                        ? "warning"
                        : data.urg == 3
                        ? "danger"
                        : "info"
                    }
                  ></div>
                  <span>{data.text}</span>
                </div>
              </div>
            );
          })}

          <DialogActions>
            <Button color="error" variant="outlined" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                onSubmit();
              }}
            >
              Envoyer
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
