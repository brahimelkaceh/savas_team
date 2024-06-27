import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { BorderLeft } from "@mui/icons-material";

export default function ErrorAlert({ error, setError }) {
  const [alert, setAlert] = useState(true);
  //   console.log(error);
  let timer1 = setTimeout(() => {
    setAlert(false);
    setError(null);
  }, 5300);

  useEffect(() => {
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <>
      {alert && (
        <div className={alert ? "show-error-alert" : "error-alert"}>
          <Collapse in={alert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{
                mb: 2,
                bgcolor: "#FCD0CF",
                borderLeft: "4px solid #dc2626",
              }}
            >
              {/* <AlertTitle>Error</AlertTitle> */}

              <strong>{error}</strong>
              {/* ) : ( */}
              {/* <strong>Veuillez compléter tous les champs obligatoires.</strong> */}
              {/* )} */}
            </Alert>
          </Collapse>
        </div>
      )}
    </>
  );
}
