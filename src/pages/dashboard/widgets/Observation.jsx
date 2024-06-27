import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import UseFetchData from "../../../hooks/UseFetchData";
import Loader from "../../../components/loader/Loader";
import { Skeleton } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

function Observation() {
  const status = useSelector((state) => state.toggleLeftBar.status);

  const apiUrl = useMemo(() => `${base_url}observs-list/`, []);

  const { data, loading, error } = UseFetchData(apiUrl);

  if (error) {
    return <div className="card-item">Error occurred: {error.message}</div>;
  }

  if (loading) {
    return (
      <main className={status === true ? "page page-with-sidebar " : "page"}>
        <div className="observations">
          <div className="card-item">
            <div className="card-content">
              <Skeleton width="100%" height={100} />
              <Skeleton width="100%" height={100} />
              <Skeleton width="100%" height={100} />
              <Skeleton width="100%" height={100} />
              <Skeleton width="100%" height={100} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="observations">
      <p className="title" style={{ fontSize: "15px" }}>
        Observations
      </p>
      {data &&
        data.map((observ, index) => {
          return (
            <div key={index} className="card-item">
              <div className="card-content">
                <div className="card-title">{observ.batiment}</div>
                <p
                  className={`${
                    observ.urg === 4
                      ? "info"
                      : observ.urg === 1
                      ? "good"
                      : observ.urg === 2
                      ? "warning"
                      : "danger"
                  } `}
                >
                  {observ.urg === 4 ? (
                    <InfoIcon className="info-icon" />
                  ) : observ.urg === 1 ? (
                    <CheckCircleIcon className="good-icon" />
                  ) : observ.urg === 2 ? (
                    <ErrorIcon className="warning-icon" />
                  ) : (
                    <OfflineBoltIcon className="danger-icon" />
                  )}
                  {observ.text}
                </p>
              </div>
              <div className="card-date">{observ.date}</div>
            </div>
          );
        })}
    </div>
  );
}

export default Observation;
