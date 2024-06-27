import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import "./sitesbar.css";
import {
  ShowBatimentCat,
  ProductionData,
  SitesDate,
} from "../../slices/ShowBatimentCat";
import { inputStatus } from "../../slices/Showfields";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let base_url = "https://pouliprod.savas.ma/api/";

const SitesBar = ({ siteData }) => {
  const [open, setOpen] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [value, setValue] = useState(0);

  const inputV = useSelector((state) => state.toggleFieldStatus.inputV);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(inputStatus(true));
    setOpen(false);
  };
  const handleConfirmChange = () => {
    dispatch(ProductionData(siteName));
    dispatch(inputStatus(false));

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const GetBatimentData = (id) => {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    fetch(`${base_url}get-site-bats/?site=${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(JSON.parse(data));
        dispatch(SitesDate(JSON.parse(data)));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    let sName = siteData[0];
    GetBatimentData(sName.site_id);
    dispatch(ShowBatimentCat());
    dispatch(ProductionData(sName));
  }, []);
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        className="sites-bar"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force example"
      >
        {siteData.map((sName) => (
          <Tab
            key={sName.site_id}
            label={sName.name}
            className="site-button"
            onClick={() => {
              setSiteName(sName);
              GetBatimentData(sName.site_id);
              if (inputV === true) {
                dispatch(ShowBatimentCat());
                handleClickOpen();
              } else {
                dispatch(ProductionData(sName));
              }
            }}
          />
        ))}
      </Tabs>
      <div>
        {open && (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className=""
          >
            <DialogTitle>
              {"Attention ! Avertissement d'effacement des données"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Êtes-vous sûr de vouloir continuer ? Cette action effacera
                définitivement toutes vos données et ne pourra pas être annulée.
                Veuillez confirmer votre décision.
              </DialogContentText>
            </DialogContent>
            <DialogActions className="btns">
              <button onClick={handleClose} className="delete-btn">
                Annuler
              </button>
              <button className="cancel-btn" onClick={handleConfirmChange}>
                continuer
              </button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </Box>
  );
};

export default SitesBar;
