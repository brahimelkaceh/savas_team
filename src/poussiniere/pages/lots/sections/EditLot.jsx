import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useMemo } from "react";
import { Alert, Button, CircularProgress, IconButton } from "@mui/material";
import UseFetchData from "../../../../hooks/UseFetchData";
let base_url = "https://farmdriver.savas.ma/api/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  width: "50%",
};

export default function EditLot({ open, setOpen, lotId, setRefetchData }) {
  const [lotData, setLotData] = useState([]);
  const [siteId, setSiteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleClose = () => {
    setOpenSuccess(false);
    setError("");
    setLoading(false);
  };
  //? get Sites data
  const SiteApiurl = useMemo(() => `${base_url}get-pouss-sites/`, [base_url]);
  const { data: siteData, loading: siteLoading } = UseFetchData(SiteApiurl);
  //? get Guide data
  const apiGuideUrl = useMemo(
    () => `${base_url}get-active-guides/?type=1`,
    [base_url]
  );
  const { data: guideData, loading: guideLoading } = UseFetchData(apiGuideUrl);

  // ? Get Batiments data
  const apiBatsUrl = useMemo(
    () => `${base_url}get-pouss-bats/?site=${siteId}`,
    [base_url, siteId]
  );
  const { data: batsData, loading: batsLoading } = UseFetchData(apiBatsUrl);
  const poussiniereBatData = batsData?.filter(
    (bat) => bat?.type === "poussiniere"
  );
  const formik = useFormik({
    initialValues: {
      site: "",
      guideParent: "",
      batiment: "",
      code: "",
      effectifDP: "",
      birthDate: "",
      transferDate: "",
      lotId: "",
    },
    // validationSchema,
    onSubmit: (values) => {
      console.log("from on submit event");
      UpdateLot(values);
    },
  });

  const UpdateLot = async (data) => {
    // console.log(data);
    // return;
    try {
      setLoading(true);
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}update-lot/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        setIsModalOpen(true);
        setLoading(false);
        setOpenSuccess(false);
        setOpen(false);
        formik.handleReset();
        handleClose();
        setRefetchData(new Date().getMilliseconds());
      } else {
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la modification ce lot."
        );
      }
    } catch (err) {
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la modification ce lot."
      ); // Handle the error as needed
      // You can also log the error to the console if necessary
      console.error("Error in CreateLot:", err);
    } finally {
      setLoading(false);
    }
  };

  const getLotById = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;
      const response = await fetch(`${base_url}get-lot-prefiled/?lotId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        // Handle non-successful responses (e.g., 404 Not Found)
        throw new Error(`Failed to fetch data for id ${lotId}`);
      }
      const data = await response.json();
      setLotData(data);
      setSiteId(data?.site_id);
      //   console.log(formik.values);
    } catch (error) {
      console.error(`Error fetching data for id ${id}:`, error.message);
    }
  };
  useEffect(() => {
    formik.initialValues;
    // ! Get batiment Id
    formik.setValues({
      ...formik.values,
      site: lotData.site_id,
      batiment: lotData.batiment_id,
      guideParent: lotData.guide_id,
      birthDate: lotData.birthDate,
      transferDate: lotData.mep,
      effectifDP: lotData.effectifDP,
      code: lotData.code,
      modifiable: lotData.modifiable,
      lotId: lotData.lotId,
    });
    setSiteId(siteId);
  }, [lotData]);
  useEffect(() => {
    getLotById(lotId);
  }, [lotId]);
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
              <form className="lot-form settings-form-pouss">
                <p className="title">
                  Modifier lot :{" "}
                  <span
                    style={{
                      fontSize: "12px",
                      marginLeft: "10px",
                      color: "#333",
                    }}
                  >
                    {formik.values.code}
                  </span>
                </p>

                <div className="flex">
                  <label>
                    <select
                      id="guide"
                      name="guideParent"
                      className="input"
                      placeholder=""
                      value={formik.values.guideParent}
                      onChange={formik.handleChange}
                    >
                      {guideData &&
                        guideData?.map((guide) => (
                          <option
                            key={guide.id}
                            value={guide.id}
                            className="input"
                          >
                            {guide.name}
                          </option>
                        ))}
                    </select>
                    <span>
                      {guideLoading ? "loading..." : "Sélectionner guide"}
                    </span>
                  </label>
                  <label>
                    <select
                      id="batimentId"
                      disabled={true}
                      name="batimentId"
                      className="input"
                      placeholder=""
                      value={formik?.values?.batiment}
                      onChange={formik.handleChange}
                    >
                      {poussiniereBatData &&
                        poussiniereBatData?.map((bat) => {
                          return (
                            <option
                              key={bat.id}
                              value={bat.id}
                              className="input"
                            >
                              {bat.name}
                            </option>
                          );
                        })}
                    </select>
                  </label>
                  <label>
                    <select
                      id="site"
                      name="site"
                      className="input"
                      disabled={true}
                      placeholder=""
                      value={formik.values.site}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setSiteId(e.target.value);
                      }}
                    >
                      <option value="">--</option>
                      {siteData &&
                        siteData?.map((site) => (
                          <option
                            key={site.id}
                            value={site.id}
                            className="input"
                          >
                            {site.name}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
                <label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    className="input"
                    placeholder=""
                    value={formik.values?.code}
                    onChange={formik.handleChange}
                  />
                  <span>Code lot</span>
                </label>
                <label>
                  <input
                    id="effectifDP"
                    name="effectifDP"
                    type="number"
                    className="input"
                    placeholder=""
                    value={formik.values?.effectifDP}
                    onChange={formik.handleChange}
                  />
                  <span> Effectif logée</span>
                </label>
                <label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className="input"
                    placeholder=""
                    disabled={!formik.values.modifiable}
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                  />
                  <span>
                    {!formik.values.modifiable ? "" : "Date Naissance"}{" "}
                  </span>
                </label>
                <label>
                  <input
                    id="transferDate"
                    name="transferDate"
                    type="date"
                    className="input"
                    placeholder=""
                    value={formik.values.transferDate}
                    onChange={formik.handleChange}
                  />
                  <span>Date transfert</span>
                </label>

                <div
                  style={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                      // flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => {
                        setOpenSuccess(true);
                        setMessage(
                          "Êtes-vous sûr de vouloir modifier ce lot ? Confirmez ou annulez."
                        );
                      }}
                    >
                      Enregistrer{" "}
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setOpen(false);
                      }}
                      my={2}
                    >
                      Fermer
                    </Button>
                  </div>
                  {openSuccess && (
                    <Alert
                      sx={{
                        p: 0,
                        px: 2,
                        py: 0.5,
                        my: 1,
                      }}
                      severity="success"
                      variant="outlined"
                      action={
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          <Button
                            onClick={formik.handleSubmit}
                            color="success"
                            variant="contained"
                            size="medium"
                          >
                            {loading ? "Confirmation en cours..." : "Confirmer"}
                            {loading && (
                              <CircularProgress color="inherit" size={22} />
                            )}{" "}
                          </Button>{" "}
                          <Button
                            onClick={handleClose}
                            color="error"
                            variant="outlined"
                            size="small"
                          >
                            Annuller
                          </Button>
                        </Box>
                      }
                    >
                      {message}
                    </Alert>
                  )}
                  {error && (
                    <Alert
                      severity="error"
                      variant="filled"
                      onClose={() => setError("")}
                      sx={{
                        p: 0,
                        px: 2,
                        py: 0.5,
                        my: 1,
                      }}
                    >
                      {error}
                    </Alert>
                  )}
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
