import React, { useEffect } from "react";
import { useMemo } from "react";
import UseFetchData from "../../hooks/UseFetchData";
import { useState } from "react";
import SitesBar from "../components/sitesBar/Index";
import Batiment from "../components/batsBar/Index";
import Navbar from "../components/navbar/Navbar";
import { DataProvider } from "../context/DataProvider";
import { Alert, LinearProgress } from "@mui/material";
import api from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
let base_url = "https://farmdriver.savas.ma/api/";

const CreateRepport = () => {
  const [sites, setSites] = useState([]);
  const [bats, setBats] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPoussLot = async () => {
    try {
      setLoading(true);
      const result = await api.getPoussSites();
      if (result.status === 200) {
        setSites(result?.data);
      } else {
        toast.error("Échec de récupération les site; Veuillez réessayer.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Échec de récupération les site; Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPoussLot();
  }, []);
  const fetchLotData = async (id) => {
    try {
      if (!id) {
        return;
      }
      setLoading(true);
      const result = await api.getPoussLotSelect(id);
      if (result.status === 200) {
        setBats(result.data);
      } else {
        toast.error("Échec de récupération les lots; Veuillez réessayer.");
      }
    } catch (error) {
      toast.error("Échec de récupération les lots; Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLotData(siteId);
  }, [siteId]);
  return (
    <DataProvider>
      <main className="page">
        <Toaster gutter={8} position="bottom-right" reverseOrder={false} />
        <Navbar />
        <SitesBar
          sites={sites}
          fetchLotData={fetchLotData}
          setSiteId={setSiteId}
        />
        {loading && <LinearProgress />}
        {bats && <Batiment batiments={bats} siteId={siteId} />}
      </main>
    </DataProvider>
  );
};

export default CreateRepport;
