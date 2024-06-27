// apiService.js
import axios from "axios";

const API_BASE_URL = "https://farmdriver.savas.ma/api/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchData = async (endpoint, data) => {
  try {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await apiService.request({
      url: endpoint,
      ...requestOptions,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
