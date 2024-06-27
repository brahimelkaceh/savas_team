import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  AppBar,
  IconButton,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { Close, Fullscreen } from "@mui/icons-material";
import ProductionChart from "../charts/ProductionChart";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductionModal({ code, i, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      maxWidth={"xl"}
      fullWidth
      keepMounted
      fullScreen
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <AppBar color="primary" sx={{ position: "relative", marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="caption"> {code.lot}</Typography>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Production œufs
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            fermer
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <div
          style={{
            background: "#fff",
            height: "100%",
          }}
        >
          <ProductionChart show={open} code={code} i={i} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
