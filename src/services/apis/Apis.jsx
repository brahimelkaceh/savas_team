// apiService.js
import axios from "axios";

const API_BASE_URL = "https://farmdriver.savas.ma/api/";
// const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;
// console.log(accessToken);

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("authTokens"))}`,
  },
});

export const fetchLotData = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchLotIdentificationData = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiService;
