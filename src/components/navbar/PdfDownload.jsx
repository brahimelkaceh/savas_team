import {
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Index, { SyntheseParAge } from "../synthese/Index";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom";
let base_url = "https://farmdriver.savas.ma/api/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const PdfDownload = ({ className }) => {
  const [openDialog, setOpen] = useState(false);
  const [openSecdialog, setOpenSecDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdf1Loading, setPdf1Loading] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWeekPdfClick = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;
      const response = await fetch(`${base_url}synthese-pdf/?finished=${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      // Create a temporary URL for the received blob
      const url = window.URL.createObjectURL(blob);

      // Create a hidden anchor element for downloading
      let fileName = response.headers
        .get("Content-Disposition")
        .substring(21)
        .replace("Synthese", "Synthèse")
        .replace("achevees", "achevées");
      const a = document.createElement("a");
      // fileName = fileName;

      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      // Append the anchor element to the DOM
      document.body.appendChild(a);

      // Trigger a click event on the anchor element to initiate the download
      a.click();

      // Remove the anchor element from the DOM
      document.body.removeChild(a);

      // Revoke the object URL to free up resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    } finally {
      setPdfLoading(false); // Set loading to false when the fetch is complete
      setPdf1Loading(false);
    }
  };
  return (
    <>
      <a
        variant="outlined"
        onClick={handleClick}
        className={className}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <TextSnippetIcon></TextSnippetIcon> Synthèse de performance
        <ExpandMoreIcon></ExpandMoreIcon>
      </a>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            handleWeekPdfClick(0);
            setPdf1Loading(true);
          }}
        >
          <Link className="child-link " to="">
            <DownloadIcon className="sidebar-icons" />
            <span>
              {pdf1Loading ? "Téléchargement..." : "Synthèse Semaine en cours"}
            </span>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            handleWeekPdfClick(1);
            setPdfLoading(true);
          }}
        >
          <Link className="child-link " to="">
            <DownloadIcon className="sidebar-icons" />
            <span>
              {pdfLoading ? "Téléchargement..." : "Synthèse Semaine complète"}
            </span>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClickOpen}>
          <Link className="child-link" to="">
            <DownloadIcon className="sidebar-icons" />
            <span>État de production journalière</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setOpenSecDialog(true)}>
          <Link className="child-link" to="">
            <DownloadIcon className="sidebar-icons" />
            <span>Synthèse par âge figé</span>
          </Link>
        </MenuItem>
      </Menu>
      {openDialog && (
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogTitle>
              {"Synthèse hébodmadaire des performance :"}
            </DialogTitle>
            <Index />
          </DialogContent>
        </Dialog>
      )}
      {openSecdialog && (
        <Dialog
          open={openSecdialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenSecDialog(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogTitle>{"Synthèse par âge figé :"}</DialogTitle>
            <SyntheseParAge />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PdfDownload;
