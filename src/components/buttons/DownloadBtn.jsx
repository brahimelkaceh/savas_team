import "./doawnloadbt.css";
import { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LinearLoader from "../loader/LinearLoader";
import Loader from "../loader/Loader";
let base_url = "https://farmdriver.savas.ma/api/";

const DownloadBtn = ({ content, id }) => {
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleWeekPdfClick = async (id) => {
    setPdfLoading(true);
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
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "week_report.pdf"; // Change the file name if needed

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
    <div
      // data-tooltip={pdfLoading ? "loading..." : "Size: 20Mb"}
      className="button"
      onClick={(e) => {
        e.preventDefault();
        handleWeekPdfClick(id);
        console.log("pdf download");
      }}
    >
      {pdfLoading && <LinearLoader />}
      <div className="button-wrapper">
        <div className="text">{pdfLoading ? "Téléchargement..." : content}</div>
        <span className="icon">
          {pdfLoading ? (
            "Téléchargement..."
          ) : (
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              height="2em"
              width="2em"
              role="img"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
              ></path>
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default DownloadBtn;
