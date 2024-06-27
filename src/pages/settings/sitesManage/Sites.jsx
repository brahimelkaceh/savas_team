import SitesTable from "./SitesTable";
import SitesManage from "./SitesManage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
let base_url = "https://farmdriver.savas.ma/api/";

import "./style.css";
import api from "../../../api/api";
function SitesContainer() {
  let renderData = useSelector((state) => state.getSiteData.renderData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const result = await api.getAllSites();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, [renderData]);
  return (
    <div className="sites-settings">
      <SitesManage />
      <SitesTable sites={data} loading={loading} />
    </div>
  );
}

export default SitesContainer;
