import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Close, Download, Send } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SelectedSite from "../selectedSite/SelectedSite";
import SelectedLot from "../selectedSite/SelectedLot";
import { useState } from "react";
import { IconButton, Stack, SvgIcon } from "@mui/material";
import { LoadingButton } from "@mui/lab";
let base_url = "https://farmdriver.savas.ma/api/";

export default function EtatProduction() {
  const [siteId, setSiteId] = useState([]);
  const [lotId, setLotId] = useState("");
  const [open, setOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  console.log("lot id", lotId);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePerformancePdfClick = async (id) => {
    setPdfLoading(true);
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;
      const response = await fetch(
        `${base_url}get-pouss-report-pdf/?lotId=${id}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      // Create a temporary URL for the received blob
      const url = window.URL.createObjectURL(blob);
      console.log(response.headers);
      // Create a hidden anchor element for downloading
      let fileName = response.headers.get("Content-Disposition").substring(21);

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
    }
  };
  return (
    <React.Fragment>
      <Link to="" className="child-link" onClick={handleClickOpen}>
        <Download /> Rapport des performances
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
        fullWidth
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {" "}
          <DialogTitle
            sx={{
              color: "#1565c0",
            }}
          >
            Rapport des performances
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <SvgIcon>
              <Close />
            </SvgIcon>
          </IconButton>
        </Stack>
        <DialogContent>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            gap={2}
            m={1}
          >
            <SelectedSite siteId={siteId} setSiteId={setSiteId} />
            <SelectedLot siteId={siteId} setLotId={setLotId} lotId={lotId} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={() => handlePerformancePdfClick(lotId)}
            endIcon={<Download />}
            loading={pdfLoading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Télécharger</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
