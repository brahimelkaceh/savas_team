import React, { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
const ExcelDownloadButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = () => {
    setLoading(true);

    // Replace 'your_excel_file_url' with the actual URL of your Excel file
    const excelFileUrl = "/maquette_prophylaxis.xlsx";

    // Create an invisible anchor element
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.href = excelFileUrl;

    anchor.download = "maquette_prophylaxis.xlsx"; // Specify the desired file name

    // Append the anchor element to the document
    document.body.appendChild(anchor);
    console.log(anchor);
    // Trigger a click on the anchor element to start the download
    anchor.click();

    // Remove the anchor element from the document
    document.body.removeChild(anchor);

    setLoading(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="text"
        startIcon={<DownloadIcon />}
        onClick={handleDownload}
      >
        Télécharger maquette
      </Button>

      {loading && <CircularProgress size={20} sx={{ marginLeft: 1 }} />}

      {error && (
        <Typography variant="caption" color="error" sx={{ marginLeft: 1 }}>
          Erreur lors du téléchargement.
        </Typography>
      )}
    </div>
  );
};

export default ExcelDownloadButton;
