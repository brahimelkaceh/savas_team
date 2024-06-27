import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../services/ChartsApis/ChartsServices";

const ChartsContext = createContext();

export const ChartProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [consoData, setConsoData] = useState([]);
  const [altData, setAltData] = useState([]);
  const [homogPvData, setHomogPvData] = useState([]);
  const [icData, setIcData] = useState([]);
  const [mortData, setmortData] = useState([]);
  const [masOeufData, setMesOeufData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const responseData = await fetchData(`table-prod-chart/?lotId=${72}`);
        setData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchAltData = async () => {
      try {
        const responseData = await fetchData(
          `table-altoeuf-chart/?lotId=${72}`
        );
        setAltData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchIcData = async () => {
      try {
        const responseData = await fetchData(`table-ic-chart/?lotId=${72}`);
        setIcData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchHomogPvData = async () => {
      try {
        const responseData = await fetchData(`homog-pv-chart/?lotId=${72}`);
        setHomogPvData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchMortData = async () => {
      try {
        const responseData = await fetchData(`table-mort-chart/?lotId=${72}`);
        setmortData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchMasseData = async () => {
      try {
        const responseData = await fetchData(
          `table-massoeuf-chart/?lotId=${72}`
        );
        setMesOeufData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchConsoData = async () => {
      try {
        const responseData = await fetchData(`table-conso-chart/?lotId=${72}`);
        setConsoData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMasseData();
    fetchMortData();
    fetchConsoData();
    fetchHomogPvData();
    fetchAltData();
    fetchProductData();
    fetchIcData();
  }, []);

  const ChartsContextValue = {
    data: data,
    consoData: consoData,
    altData: altData,
    homogPvData: homogPvData,
    icData: icData,
    mortData: mortData,
    masOeufData: masOeufData,
  };

  return (
    <ChartsContext.Provider value={ChartsContextValue}>
      {children}
    </ChartsContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(ChartsContext);
  if (!context) {
    throw new Error("useProduct must be used within a ChartProvider");
  }
  return context;
};

export default ChartsContext;
