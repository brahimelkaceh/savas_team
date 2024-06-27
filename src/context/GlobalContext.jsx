import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchLotData,
  fetchLotIdentificationData,
} from "../services/apis/Apis";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [lotTitles, setLotTitles] = useState([]);
  const [lotTitlesLoading, setLotTitlesLoading] = useState(false);
  useEffect(() => {
    setLotTitlesLoading(true);
    const fetchLotDataFromApi = async () => {
      try {
        const response = await fetchLotData("get-lots-titles/");
        setLotTitles(response);
        setLotTitlesLoading(false);
      } catch (error) {
        console.log(error);
        setLotTitlesLoading(false);
      }
    };

    fetchLotDataFromApi();
  }, []);

  const fetchLotIdentificationDataFromApi = async (id) => {
    try {
      const response = await fetchLotIdentificationData(
        `get-lot-identification/?lotId=${id}`
      );
      console.log(response);
      //   setLotTitlesLoading(false);
    } catch (error) {
      console.log(error);
      //   setLotTitlesLoading(false);
    }
  };
  const values = {
    lotTitles,
    lotTitlesLoading,
    fetchLotIdentificationDataFromApi,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Error creating context for use context ");
  }
  return context;
};
