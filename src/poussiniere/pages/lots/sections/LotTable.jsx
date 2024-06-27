import React, { useEffect } from "react";
import { useMemo, useState } from "react";

import SiteSelected from "./SiteSelected";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EditLot from "./EditLot";
import { Delete, Edit } from "@mui/icons-material";
import UseFetchData from "../../../../hooks/UseFetchData";

let base_url = "https://farmdriver.savas.ma/api/";

const LotTable = ({ onRefetch, setRefetchData }) => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [lotId, setLotId] = useState("");
  const [siteId, setSiteId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleClose = () => {
    setOpenSuccessModal(false);
    setOpenSuccess(false);
  };
  const lotTitlesApiUrl = useMemo(
    () => `${base_url}get-pouss-lots/?site=${siteId}&table=${1}`,
    [base_url, siteId]
  );
  const {
    data,
    loading: lotLoading,
    refetchData,
  } = UseFetchData(lotTitlesApiUrl);
  const lotActive = data?.filter((lot) => lot.type === "poussiniere");

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}delete-lot/?lotId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setLoading(false);
        setOpenSuccess(false);
        setSiteId(siteId);
        refetchData();
      } else {
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la suppression de ce lot."
        );
      }
    } catch (err) {
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la suppression de ce lot."
      );
      console.error("Error in Delete Lot:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refetchData();
  }, [onRefetch]);
  return (
    <div className="data-lot-container settings-form-pouss">
      {open && (
        <EditLot
          open={open}
          setOpen={setOpen}
          lotId={lotId}
          setRefetchData={setRefetchData}
        />
      )}

      <p className="title">Lots actifs</p>
      <div className="reform-cards">
        <SiteSelected setSiteId={setSiteId} />
        {lotLoading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={25} />
          </Box>
        )}

        {lotActive &&
          lotActive.map((lot, i) => {
            return (
              <div
                className={
                  lot.isReformed
                    ? "reform-card disabled-reform-card"
                    : "reform-card"
                }
                key={i}
              >
                <div className="code-lot">
                  {lotLoading ? <span>loading...</span> : <p>{lot.code}</p>}
                </div>
                <div className={`${lot.isRefroming} && "active-reform"`}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  ></div>
                  <IconButton
                    disabled={!lot.deletable}
                    color="error"
                    onClick={() => {
                      setOpenSuccess(true);
                      setLotId(lot.id);

                      setMessage(
                        "Êtes-vous sûr de vouloir modifier ce lot ? Confirmez ou annulez."
                      );
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => {
                      setOpen(true);
                      setLotId(lot.id);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </div>
              </div>
            );
          })}
        {lotActive?.length == 0 && (
          <Alert severity="warning">
            Ce site n'a actuellement aucun lot actif.
          </Alert>
        )}
        {openSuccess && (
          <Alert
            sx={{
              p: 0,
              px: 2,
              py: 0.5,
              my: 0,
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
                  onClick={() => {
                    handleDelete(lotId);
                  }}
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
              my: 0,
            }}
          >
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default LotTable;
// const toggleReform = async (id) => {
//   try {
//     const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;
//     const response = await fetch(`${base_url}toggle-reform/?lotId=${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (response.ok) {
//       console.log(response.message);
//     } else {
//       console.error("Error  data");
//     }
//   } catch (error) {
//     console.error("Error  data:", error);
//   }
// };
{
  /* <button
                      disabled={!lot.isRefroming}
                      className="refomed-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleReform(lot.id);
                      }}
                    >
                      {lot.isRefroming ? (
                        <HiPause
                          fontSize={"18px"}
                          style={{ color: "#C70039" }}
                        ></HiPause>
                      ) : (
                        <HiPlay
                          fontSize={"18px"}
                          style={{ color: "#4F6F52" }}
                        ></HiPlay>
                      )}
                    </button>
                    {lot.isRefroming ? (
                      <span>Arreter la reforme</span>
                    ) : (
                      <span>Démarrer la reforme</span>
                    )} */
}
{
  /* <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setLotId(lot.id);
                        setOpenSuccessModal(true);
                        // markreformd(lot.id);
                      }}
                    >
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M20 17h2v2H2v-2h2v-7a8 8 0 1 1 16 0v7zm-2 0v-7a6 6 0 1 0-12 0v7h12zm-9 4h6v2H9v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                    Réforme arrêtée
                  </div> */
}
