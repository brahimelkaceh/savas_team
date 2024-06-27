import { createContext } from "react";
import { useState, useEffect } from "react";
let base_url = "https://farmdriver.savas.ma/api/";

const LotContext = createContext();
export default LotContext;

// lots-dates-ages/?lotids=${lotIds}
export const LotProvider = ({ children }) => {
  const [sites, getSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lotData, setLotData] = useState([]);
  const [lotLoading, setLotLoading] = useState(false);

  const getAllSelectedLots = (selectedLot) => {
    const uniqueNumbers = new Set();
    selectedLot.forEach((childArray) => {
      const numericValue = Number(childArray[0]);
      if (!isNaN(numericValue) && numericValue !== 0) {
        uniqueNumbers.add(numericValue);
      }
    });
    const result = Array.from(uniqueNumbers);
    console.log(result);
    getLotsDatesAge(result);
  };

  const getSiteBatsLots = async () => {
    setLoading(true);
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }

      const accessToken = authTokens.access;
      const response = await fetch(`${base_url}get-site-bats-lots/`, {
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
        getSites(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getLotsDatesAge = async (lotIds) => {
    setLotLoading(true);
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }

      const accessToken = authTokens.access;
      lotIds = JSON.stringify(lotIds);
      console.log(lotIds);
      const response = await fetch(
        `${base_url}lots-dates-ages/?lotids=${lotIds !== 0 && lotIds}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data) {
        setLotData(data);
        setLotLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLotLoading(false);
    }
  };

  const generateProductionPdf = async (lots, isAge) => {
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }

      const accessToken = authTokens.access;
      const response = await fetch(
        `${base_url}custom-production-state-pdf/?lots=${lots}&isAge=${isAge}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      if (response.ok) {
        // console.log(response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    getSiteBatsLots();
  }, []);
  let contextData = {
    sites: sites,
    loading: loading,
    getAllSelectedLots: getAllSelectedLots,
    lotData: lotData,
    lotLoading: lotLoading,
  };

  return (
    <LotContext.Provider value={contextData}>{children}</LotContext.Provider>
  );
};
