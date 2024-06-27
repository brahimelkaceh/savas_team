import React, { useState } from "react";
import { useFormik } from "formik";
import { useMemo } from "react";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import UseFetchData from "../../../../hooks/UseFetchData";

let base_url = "https://farmdriver.savas.ma/api/";
const LotForm = ({ setRefetchData }) => {
  const [bats, setBats] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const apiUrl = useMemo(
    () => `${base_url}get-active-guides/?type=1`,
    [base_url]
  );
  const { data, loading: guideLoading } = UseFetchData(apiUrl);

  const SiteApiurl = useMemo(() => `${base_url}get-pouss-sites/`, [base_url]);
  const { data: siteData, loading: siteLoading } = UseFetchData(SiteApiurl);

  const fetchBatsData = (id) => {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    setLoadingData(true);

    fetch(`${base_url}get-pouss-bats/?site=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const poussiniereBats = data?.filter(
          (d) => d.type === "poussiniere" && d.isEmpty
        );
        console.log(poussiniereBats);
        setBats(poussiniereBats);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingData(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      site: 0,
      batiment: 0,
      guide: 0,
      code: "",
      effectifDP: 0,
      birthDate: "",
      transferDate: "",
      hebdoFill: false,
      reformStarted: false,
    },
    onSubmit: (values) => {
      CreateLot(values);
    },
  });
  const handleClose = () => {
    setOpenSuccessModal(false);
    setError("");
    setLoading(false);
  };

  const CreateLot = async (data) => {
    try {
      setLoading(true);
      setError("");
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}add-lot/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setLoading(false);
        setOpenSuccessModal(false);
        setError("");
        formik.handleReset();
        setRefetchData(new Date().getMilliseconds());
      } else {
        setLoading(false);
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la création ce lot."
        );
      }
      if (response.error) {
        throw new Error(
          "Un bâtiment ne peut en aucun cas comporter plus d'un lot."
        );
      }
    } catch (err) {
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la création ce lot."
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setOpenSuccessModal(false);
        setError("");
      }, 3500);
    }
  };

  return (
    <div className="lot-creation">
      <form
        className="lot-form settings-form-pouss"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="title">Déclarer un nouveau lot</p>
        <div className="flex">
          <label>
            <select
              id="guide"
              name="guide"
              className="input"
              placeholder=""
              value={formik.values.guide}
              onChange={formik.handleChange}
            >
              <option value="">--</option>
              {data &&
                data?.map((guide) => (
                  <option key={guide.id} value={guide.id} className="input">
                    {guide.name}
                  </option>
                ))}
            </select>
            <span>{guideLoading ? "loading..." : "Sélectionner guide"}</span>
          </label>
          <label>
            <select
              id="batiment"
              name="batiment"
              className="input"
              placeholder=""
              value={formik.values.batiment}
              onChange={formik.handleChange}
            >
              <option value="">--</option>
              {bats &&
                bats?.map(
                  (bat) =>
                    bat.isEmpty && (
                      <option key={bat.id} value={bat.id} className="input">
                        {bat.name}
                      </option>
                    )
                )}
            </select>
            <span> {loadingData ? "loading..." : "Sélectionner bâtiment"}</span>
          </label>
          <label>
            <select
              id="site"
              name="site"
              className="input"
              placeholder=""
              disabled={siteLoading}
              value={formik.values.site}
              onChange={(e) => {
                fetchBatsData(e.target.value);
                formik.handleChange(e);
              }}
            >
              <option value="">--</option>

              {siteData &&
                siteData?.map((site) => (
                  <option key={site.id} value={site.id} className="input">
                    {site.name}
                  </option>
                ))}
            </select>
            <span> {siteLoading ? "loading..." : "Sélectionner site"}</span>
          </label>
        </div>
        <label>
          <input
            id="code"
            name="code"
            type="text"
            className="input"
            placeholder=""
            value={formik.values.code}
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
            value={formik.values.effectifDP}
            onChange={formik.handleChange}
          />
          <span>Effectif logée</span>
        </label>
        <label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            className="input"
            placeholder=""
            value={formik.values.birthDate}
            onChange={formik.handleChange}
          />
          <span>Date Naissance</span>
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
        {/* 
        <label className="cyberpunk-checkbox-label">
          <input
            type="checkbox"
            className="switch"
            name="hebdoFill"
            checked={formik.values.hebdoFill}
            onChange={formik.handleChange}
          />
          {formik.values.hebdoFill ? "Hebdomadaire" : "Quotidien"}
        </label> */}

        <div className="bnts">
          <Button
            type="submit"
            color="success"
            variant="contained"
            onClick={() => {
              setOpenSuccessModal(true);
              setMessage(
                "Êtes-vous sûr de vouloir créer ce lot ? Confirmez ou annulez."
              );
            }}
            disabled={
              !formik.values.site.length ||
              !formik.values.guide.length ||
              !formik.values.batiment.length ||
              !formik.values.birthDate ||
              !formik.values.transferDate ||
              !formik.values.code ||
              !formik.values.effectifDP
            }
          >
            Enregistrer{" "}
            {loading && <CircularProgress color="inherit" size={22} />}
          </Button>
          {openSuccessModal && (
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
  );
};

export default LotForm;
