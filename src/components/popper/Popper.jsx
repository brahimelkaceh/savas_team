import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Popover from "@mui/material/Popover";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BiShowAlt } from "react-icons/bi";
import "./popper.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: "20px",
};

const PopperItem = ({ observation }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div onClick={handleClick}>
        {observation?.length > 0 ? (
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              color: "var(--dark-blue)",
            }}
          >
            View
            <BiShowAlt style={{ margin: "0 3px" }} />
          </p>
        ) : (
          "-"
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          id="transition-modal-description"
          sx={{ p: 2, m: 0.5, border: "2px solid black ", borderRadius: "5px" }}
        >
          {observation}
        </Typography>
      </Popover>
    </div>
  );
};

export default PopperItem;
