import React, { useState } from "react";
import PdfDownloadBtn from "../buttons/PdfDownloadBtn";
import { FormControl, Grid, Input, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Download } from "@mui/icons-material";

const Index = () => {
  const [date, setDate] = useState("");
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div
          className="input-container"
          style={{
            width: "300px",
          }}
        >
          <input
            placeholder="Enter text"
            className="input-field"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <span className="input-highlight"></span>
        </div>
      </div>
      <PdfDownloadBtn content={"Télecharger"} date={date} />
    </div>
  );
};
export const SyntheseParAge = () => {
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSyntheseParAgePdf = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.SyntheseParAgePdf(age);
      toast.success("PDF téléchargé avec succès !");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Échec du téléchargement du PDF. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false); // Set loading to false when the fetch is complete
    }
  };
  return (
    <form onSubmit={handleSyntheseParAgePdf}>
      <Grid container spacing={1} mb={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            required
            label="Âge"
            size="small"
            type="number"
            fullWidth
            variant="outlined"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            size="small"
            type="submit"
            endIcon={<Download />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Télecharger</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default Index;
