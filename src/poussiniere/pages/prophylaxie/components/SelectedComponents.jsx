import React, { useState, useEffect, useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Chip, LinearProgress, Stack, Typography } from "@mui/material";
import UseFetchData from "../../../../hooks/UseFetchData";

let base_url = "https://farmdriver.savas.ma/api/";

export default function SelectedComponents({
  lotId,
  setLotId,
  setSelectedLot,
  refresh,
  selectedFile,
  setSelectedFile,
  sendFileMessage,
}) {
  const [siteId, setSiteId] = useState("");

  const SiteApiurl = useMemo(() => `${base_url}get-pouss-sites/`, [base_url]);
  const { data, loading, error } = UseFetchData(SiteApiurl, "GET");

  const lotApiUrl = useMemo(
    () => `${base_url}get-pouss-lots/?site=${siteId}`,
    [base_url, siteId]
  );

  const {
    data: lotData,
    loading: lotDataLoading,
    error: lotError,
    refetchData,
  } = UseFetchData(lotApiUrl, "GET");

  useEffect(() => {
    const selectedLot = lotData?.find((lot) => lot.id === lotId);
    if (selectedLot !== undefined) {
      setSelectedLot(selectedLot);
    }
  }, [lotId, lotData]);
  useEffect(() => {
    refetchData();
  }, [refresh]);
  const handleDeleteFile = () => {
    setSelectedFile(null);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
      }}
    >
      <Stack flexDirection="row" gap={2} alignItems="end">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Sélectionnez un Site
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            value={siteId}
            disabled={loading}
            onChange={(e) => setSiteId(e.target.value)}
          >
            {data?.map((site) => (
              <MenuItem key={site.id} value={site.id}>
                {site.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Sélectionnez un LOT
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            value={lotId ?? ""}
            disabled={lotDataLoading}
            onChange={(e) => {
              setLotId(e.target.value);
            }}
          >
            {lotData?.map((lot) => (
              <MenuItem key={lot.id} value={lot.id}>
                {lot.batiment} ({lot.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedFile && (
          <Chip
            size="small"
            color="info"
            variant="outlined"
            label={selectedFile.name}
            onDelete={handleDeleteFile}
          ></Chip>
        )}
        {sendFileMessage == "success" ? (
          <Chip
            size="small"
            color="success"
            variant="outlined"
            label="Fichier téléchargé avec succès !"
          ></Chip>
        ) : (
          sendFileMessage == "error" && (
            <Chip
              size="small"
              color="error"
              variant="outlined"
              label="Une erreur s'est produite. Veuillez réessayer."
            ></Chip>
          )
        )}
        {lotDataLoading && <LinearProgress />}
      </Stack>

      {/* Display selected lot's batiment in an h1 element */}
    </div>
  );
}
