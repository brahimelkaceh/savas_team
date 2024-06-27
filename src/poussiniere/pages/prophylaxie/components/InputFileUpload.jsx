import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Input,
  Chip,
  IconButton,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Cancel,
  CheckCircle,
} from "@mui/icons-material";
import { useState } from "react";
let base_url = "https://farmdriver.savas.ma/api/";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({
  setSelectedFile,
  selectedFile,
  lotId,
  setSendFileMessage,
  reftching,
}) {
  const [loading, setLoading] = useState(false);

  const handleSendFile = async (id, file) => {
    try {
      setLoading(true);
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;
      if (
        !file.type.includes("application/vnd.ms-excel") &&
        !file.type.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        alert("Please select an Excel file.");
        return;
      }
      const formData = new FormData();
      formData.append("excelFile", file); // Append file with name
      formData.append("lot", id);

      const response = await fetch(`${base_url}import-prophylaxis-program/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log("Response status:", response.status);
        setLoading(false);
        setSelectedFile(null);
        setSendFileMessage("success");
        reftching(id);
      } else {
        console.error("Something went wrong:", response.statusText);
        console.log("Full response:", response);
        setSendFileMessage("error");

        setLoading(false);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      setSendFileMessage("error");
      setLoading(false);
    } finally {
      setTimeout(() => {
        setSendFileMessage(false);
      }, 3500);
    }
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        size="small"
        startIcon={<CloudUploadIcon />}
      >
        {loading ? "loading..." : "Importer"}
        <Input
          type="file"
          inputProps={{ accept: ".xls, .xlsx" }}
          onChange={(event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
          }}
          style={{ display: "none" }}
        />
      </Button>
      {selectedFile && (
        <>
          <Tooltip placement="top" title="Envoyer">
            <IconButton
              size="small"
              color="success"
              onClick={() => handleSendFile(lotId, selectedFile)}
            >
              <SvgIcon>
                <CheckCircle />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Annuler">
            <IconButton
              size="small"
              color="error"
              onClick={() => setSelectedFile(null)}
            >
              <SvgIcon>
                <Cancel />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
}
