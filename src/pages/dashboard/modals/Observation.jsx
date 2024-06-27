import { useState, useEffect, useMemo } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SubmitBtn from "../../../components/buttons/SubmitBtn";
import { AiOutlineSend } from "react-icons/ai";
import { useData } from "../../reports/context/DataProvider";
import ObservationsModal from "../../reports/Components/modals/ObservationsModal";
import Container from "../../../components/selectedComponents/Container";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

const Observation = ({ formik, loading }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [observationUrg, setobservationUrg] = useState(0);
  const [observationText, setobservationText] = useState("");
  const [observationobjects, setobservationobjects] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleOptionChange = (option) => {
    setobservationUrg(option);
  };

  const handleObservationInputChange = (event) => {
    setobservationText(event.target.value);
  };

  const handleAddObservation = (e) => {
    e.preventDefault();
    if (observationUrg === null) {
      setobservationUrg("0");
    }

    if (editingIndex === -1) {
      // Creating a new observation
      const newObservationObject = {
        text: observationText,
        urg: observationUrg,
      };
      setobservationobjects([...observationobjects, newObservationObject]);
      console.log("New observation is created");
    } else {
      // Updating an existing observation
      const editedData = { text: observationText, urg: observationUrg };

      setobservationobjects((prevData) =>
        prevData.map((data, index) =>
          index === editingIndex ? editedData : data
        )
      );
      setEditingIndex(-1);
    }

    // Reset form fields and state variables
    setobservationUrg(null);
    setobservationText("");
  };

  const handleEdit = (index) => {
    const formToEdit = observationobjects[index];
    setobservationUrg(formToEdit.urg);
    setobservationText(formToEdit.text);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setobservationobjects((prevData) => prevData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    formik.initialValues;
    formik.setValues({
      ...formik.values,
      observs: observationobjects,
    });
  }, [observationText]);
  return (
    <div className={`box ${isOpen ? "open" : ""}`}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-multiline-static"
          label="Observation"
          multiline
          rows={6}
          value={observationText ?? ""}
          onChange={handleObservationInputChange}
          defaultValue="Default Value"
        />
      </Box>
      <div
        className="inputs-group"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="inputs-container">
          <div
            className="inputs-group"
            style={{
              alignSelf: "flex-end",
              position: "relative",
              top: "-25%",
              width: "10%",
              marginTop: "2%",
              marginBottom: "4%",
            }}
          >
            <div className="radio-button-form">
              <input
                id="good"
                type="radio"
                name="r"
                value="good"
                checked={observationUrg === "1"}
                onChange={() => handleOptionChange("1")}
              />
              <label htmlFor="good" className="good"></label>
              <input
                id="02"
                type="radio"
                name="r"
                value="warning"
                checked={observationUrg === "2"}
                onChange={() => handleOptionChange("2")}
              />
              <label htmlFor="02" className="warning"></label>
              <input
                id="03"
                type="radio"
                name="r"
                value="danger"
                checked={observationUrg === "3"}
                onChange={() => handleOptionChange("3")}
              />
              <label htmlFor="03" className="danger"></label>
              <input
                id="04"
                type="radio"
                name="r"
                value="info"
                checked={observationUrg === "4"}
                onChange={() => handleOptionChange("4")}
              />
              <label htmlFor="04" className="info"></label>
            </div>
          </div>
        </div>
        <div className="inputs-container">
          <button
            type="button"
            onClick={handleAddObservation}
            className={editingIndex === -1 ? "ajouter" : "modifier"}
          >
            {editingIndex === -1 ? "Ajouter" : "modifier"}
          </button>
        </div>
      </div>
      {observationobjects.map((data, index) => {
        return (
          <div className="observation-box " key={index}>
            <div>
              <div
                className={
                  data.urg == 1
                    ? "good-container"
                    : data.urg == 2
                    ? "warning-container"
                    : data.urg == 3
                    ? "danger-container"
                    : "info-container"
                }
              >
                <div
                  className={
                    data.urg == 1
                      ? "good"
                      : data.urg == 2
                      ? "warning"
                      : data.urg == 3
                      ? "danger"
                      : "info"
                  }
                ></div>
                <span>{data.text}</span>
              </div>
            </div>
            <div>
              <IconButton
                onClick={() => handleEdit(index)}
                aria-label="edit"
                size="large"
                className="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleDelete(index);
                  setEditingIndex(-1);
                  setobservationText("");
                }}
                aria-label="delete"
                size="large"
                className="delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
      <Button
        sx={{
          mt: 2,
        }}
        color="success"
        variant="contained"
        type="submit"
        onClick={formik.handleSubmit}
      >
        {loading ? "envoi en cours..." : "Envoyer"}
      </Button>
    </div>
  );
};

export default Observation;
