import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 3,
};

export default function ConfirmModal({
  setAlertConfirm,
  alertConfirm,
  reset,
  deleteObservs,
}) {
  const handleClose = () => {
    setAlertConfirm(false);
  };

  return (
    <div>
      <Modal
        open={alertConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
      >
        <Box sx={style} className="confirm-modal ">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Report Sent
          </Typography>
          <div className="confirm-btns">
            <button
              className="confirm type1"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleClose();

                reset();
                deleteObservs();
              }}
            >
              <span className="btn-txt">Ok</span>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
