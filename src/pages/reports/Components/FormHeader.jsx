import { Alert, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

function FormHeader({ nextReport, lot_code, loading }) {
  const [reportDate, setReportDate] = useState(nextReport);
  const [codeLot, setCodeLot] = useState(lot_code);
  useEffect(() => {
    setReportDate(nextReport);
    setCodeLot(lot_code);
  }, [nextReport, lot_code]);

  return (
    <Stack
      spacing={1}
      paddingTop={1.5}
      className="batiment-form"
      sx={{
        backgroundColor: "#0288d1",
        border: "none",
      }}
    >
      <Alert
        icon={false}
        severity="info"
        variant="standard"
        sx={{
          py: 0,
          my: 1,
          mb: 0,
        }}
      >
        <h4 style={{ display: "inline" }}> Rapport de : </h4>
        {loading ? " en cours..." : reportDate}
      </Alert>
      <Alert
        icon={false}
        severity="info"
        sx={{
          py: 0,
        }}
      >
        <h4 style={{ display: "inline" }}>Code lot :</h4>

        {loading ? "en cours..." : codeLot}
      </Alert>
    </Stack>
  );
}

export default FormHeader;
