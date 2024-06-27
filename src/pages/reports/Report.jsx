import Topbar from "../../components/Topbar";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import SitesBar from "./SitesBar";
import "./style.css";
import Batiment from "./Batiment";
import UseFetchData from "../../hooks/UseFetchData";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/navbar/Navbar";
import { DataProvider } from "./context/DataProvider";
import { LinearProgress } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

function Report() {
  const status = useSelector((state) => state.toggleLeftBar.status);

  const [sites, setSites] = useState("");
  const [siteId, setSiteId] = useState("");
  const SiteApiurl = useMemo(() => `${base_url}get-sites-titles/`, [base_url]);
  const { data, loading, error } = UseFetchData(SiteApiurl, "GET");

  const FetchData = (id) => {
    setSiteId(id);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    fetch(`${base_url}get-lots-titles/?site=${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const productionBats = data?.filter(
          (d) => d.type === "production" && d.isActive
        );
        setSites(productionBats);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <main className="page">
        <Navbar />
        <SitesBar siteData={data} FetchData={FetchData} />
        {loading && <LinearProgress />}
        <DataProvider>
          {sites && <Batiment batiments={sites} siteId={siteId} />}
        </DataProvider>
      </main>
    </>
  );
}

export default Report;
