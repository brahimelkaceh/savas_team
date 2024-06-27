import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BatimentsForm from "./BatimentsForm";
import BatimentsTable from "./BatimentsTable";
let base_url = "https://farmdriver.savas.ma/api/";

function BatimentsContainer({ siteName }) {
  let renderData = useSelector((state) => state.getSiteData.renderData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getBatsData = async () => {
    setLoading(true);

    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }

      const accessToken = authTokens.access;
      const response = await fetch(`${base_url}get-bats/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data) {
        const poussiniereData = data?.filter(
          (pous) => pous?.type == "poussiniere"
        );
        setData(poussiniereData);
      }
    } catch (error) {
      console.error("Error fetching sites data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBatsData();
  }, [renderData]);
  return (
    <div className="manage-bats slit-in-horizontal">
      <BatimentsForm siteName={siteName} />
      <BatimentsTable siteName={siteName} data={data} loading={loading} />
    </div>
  );
}

export default BatimentsContainer;
