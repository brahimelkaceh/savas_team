import { Box, Button, IconButton, Skeleton } from "@mui/material";
import React, { useMemo, useState } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import Loader from "../../../components/loader/Loader";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ObservationModal from "../modals/ObservationModal";
let base_url = "https://farmdriver.savas.ma/api/";

const ObservationCard = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const apiUrl = useMemo(() => `${base_url}observs-list/`, []);

  const { data, loading, error } = UseFetchData(apiUrl);
  if (error) {
    return <div className="card-item">Error occurred: {error.message}</div>;
  }
  if (loading) {
    return (
      <Box
        gridColumn="span 3"
        gridRow="span 2"
        height="100vh"
        backgroundColor="#fff"
        borderRadius="var(--border-radius)"
      >
        <div className="card-item">
          <div className="card-content">
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
          </div>
        </div>
      </Box>
    );
  }

  return (
    <Box className="observations" gridColumn="span 3.5" gridRow="span 12">
      {open && <ObservationModal open={open} handleClose={handleClose} />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
          padding: "0 5px",
        }}
      >
        <h2 style={{ fontSize: "15px", padding: "4px 10px", margin: "0" }}>
          Observations
        </h2>

        <PostAddIcon className="add-observ" onClick={() => setOpen(true)} />
      </Box>
      <div>
        {data &&
          data.map((observ, index) => {
            return (
              <div key={index} className="card-item">
                <div className="card-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div className="card-title">{observ.site}</div>
                    <div className="card-date">{observ.date}</div>
                  </div>
                  {observ.content.map((cont, i) => {
                    return (
                      <p
                        key={i}
                        className={`${
                          cont.urg === 0
                            ? "info"
                            : cont.urg === 1
                            ? "good"
                            : cont.urg === 2
                            ? "warning"
                            : "danger"
                        } `}
                      >
                        {cont.urg === 0 ? (
                          // <InfoIcon className="info-icon" />
                          <span className="info-icon">{cont.bat}</span>
                        ) : cont.urg === 1 ? (
                          // <CheckCircleIcon className="good-icon" />
                          <span className="good-icon">{cont.bat}</span>
                        ) : cont.urg === 2 ? (
                          // <ErrorIcon className="warning-icon" />
                          <span className="warning-icon">{cont.bat}</span>
                        ) : (
                          // <OfflineBoltIcon className="danger-icon" />
                          <span className="danger-icon">{cont.bat}</span>
                        )}
                        {cont.text}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </Box>
  );
};

export default ObservationCard;
