import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import "../modals/style.css";
import { useState } from "react";

import {
  Alert,
  Button,
  DialogActions,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import api from "../../../api/api";
import { getRenderData } from "../../../slices/SiteData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  width: 600,
};

export default function EditBatsModal({
  siteName,
  open,
  setOpen,
  batimentData,
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  // formik
  const formik = useFormik({
    initialValues: {
      bat_id: "",
      name: "",
      site: "",
      typeOf: "",
    },
    onSubmit: (values) => {
      updateBatiment(values);
    },
  });
  const updateBatiment = async (data) => {
    try {
      setLoading(true);
      const result = await api.updateBatiment(data);
      if (!result) {
        setError("Échec de la modification de bâtiment. Veuillez réessayer.");
        setMessage("");
      } else {
        setMessage("Le bâtiment a été modifié avec succès!");
        setError("");
        dispatch(getRenderData(new Date().toISOString()));
        setTimeout(() => {
          setOpen(false);
        }, 4500);
      }
    } catch (error) {
      setError("Échec de la modification de bâtiment. Veuillez réessayer.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3500);
    }
  };

  useEffect(() => {
    formik.setValues({
      bat_id: batimentData[0]?.id,
      name: batimentData[0]?.name,
      site: batimentData[0]?.site_id,
      typeOf: batimentData[0]?.type,
    });
  }, []);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="edit-modal">
            <div className="edit-site slit-in-horizontal">
              <form className="settings-form" onSubmit={formik.handleSubmit}>
                <p className="title">Modifier</p>
                <label>
                  <input
                    name="name"
                    id="batiment"
                    className="input"
                    type="text"
                    placeholder=" "
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    required={true}
                  />
                  <span> Bâtiment*</span>
                </label>
                <label>
                  <select
                    name="typeOf"
                    className="input"
                    value={formik.values.typeOf}
                    onChange={formik.handleChange}
                  >
                    <option value="production">Production</option>
                    <option value="poussiniere">Poussiniere</option>
                  </select>
                  <span> Production/Poussiniere*</span>
                </label>

                <label>
                  <select
                    required
                    id="site"
                    name="site"
                    value={formik.values.site}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    className="input"
                  >
                    {siteName?.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))}
                  </select>
                  <span> Sites*</span>
                </label>

                <DialogActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClose}
                  >
                    Annuler
                  </Button>
                  <Button
                    autoFocus
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    Enregistrer
                  </Button>
                </DialogActions>
              </form>
              {loading && <LinearProgress />}
              <Stack mx={2}>
                {error && (
                  <Alert
                    sx={{
                      py: 0,
                      mt: 1,
                    }}
                    variant="filled"
                    severity="error"
                  >
                    {error}
                  </Alert>
                )}
                {message && (
                  <Alert
                    sx={{
                      py: 0,
                      mt: 1,
                    }}
                    variant="filled"
                    severity="success"
                  >
                    {message}
                  </Alert>
                )}
              </Stack>{" "}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
