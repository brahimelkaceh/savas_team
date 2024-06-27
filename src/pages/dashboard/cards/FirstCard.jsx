import { useMemo } from "react";
import barchart from "../../../assets/bar-charts.svg";
import UseFetchData from "../../../hooks/UseFetchData";
import SkeletonBlock from "../skeletons/SkeletonBlock";
let base_url = "https://farmdriver.savas.ma/api/";

import "./card.css";

function FirstCard() {
  const apiUrl = useMemo(() => `${base_url}first-block/`, []);

  const { data, loading, error } = UseFetchData(apiUrl);
  if (loading) {
    return (
      <div className="card-1">
        <SkeletonBlock />
      </div>
    );
  }

  if (error) {
    return <div className="card-1">Error occurred: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }
  return (
    <div className="card-1">
      {data && (
        <div className="card-item-content">
          <div className="card-item-footer">
            <p className="moy-age ">
              <span>Total Effectif </span>
              {data?.effectifTot}
            </p>

            <p className="moy-age">
              <span>Age Moyen</span>
              {data?.age_moy}
              {/* <span> Sem </span> */}
            </p>
            <div className="card-item-icon">
              <img src={barchart} alt="" />
            </div>
          </div>
        </div>
      )}
      {loading && <SkeletonBlock />}
    </div>
  );
}

export default FirstCard;
