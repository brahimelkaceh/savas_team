import DownloadIcon from "@mui/icons-material/Download";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress } from "@mui/material"; // Import CircularProgress for the loading spinner
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

function DownloadBtn({ pdfname }) {
  const [loading, setLoading] = useState(false);

  const generatePDF = () => {
    setLoading(true); // Set loading to true when PDF generation starts

    const chartDiv = document.getElementById("chartDiv"); // Replace 'chartDiv' with the actual ID of your chart div
    html2canvas(chartDiv)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a5");
        const padding = 10; // Adjust the padding value as needed
        const width = pdf.internal.pageSize.getWidth() - 2 * padding;
        const height = (canvas.height * width) / canvas.width;

        // Add image with padding
        pdf.addImage(imgData, "PNG", padding, padding, width, height);
        pdf.save(pdfname);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when PDF generation is complete (success or failure)
      });
  };

  return (
    <LoadingButton
      loading={loading}
      loadingPosition="start"
      startIcon={loading ? <CircularProgress size={24} /> : <DownloadIcon />}
      variant="outlined"
      onClick={generatePDF}
    >
      Télécharger la courbe
    </LoadingButton>
  );
}

export default DownloadBtn;
