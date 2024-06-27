import api from "../../../api/api";
import BatsManage from "./BatsManage";
import BatsTable from "./BatsTable";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
let base_url = "https://farmdriver.savas.ma/api/";

function Bats({ siteName }) {
  let renderData = useSelector((state) => state.getSiteData.renderData);
  const [bats, setBats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const result = await api.getAllBats();
        setBats(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, [renderData]);
  return (
    <div className="manage-bats slit-in-horizontal">
      <BatsManage siteName={siteName} />
      <BatsTable siteName={siteName} bats={bats} loading={loading} />
    </div>
  );
}

export default Bats;
