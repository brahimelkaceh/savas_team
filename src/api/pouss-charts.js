let base_url = "https://farmdriver.savas.ma/api/";
const api = {
  // !  Poids corporel & Homogénéité Chart
  getPvHomogChartData: async (id) => {
    if (!id) {
      return;
    }
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(
        `${base_url}get-pouss-pv-chart/?lotId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(response);
      return { data, status: response.status };
    } catch (error) {
      console.error(error);
    }
  },
  // ! INDICE CONVERTIONS Chart
  getIcChartData: async (id) => {
    if (!id) {
      return;
    }
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(
        `${base_url}get-pouss-ic-chart/?lotId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(response);
      return { data, status: response.status };
    } catch (error) {
      console.error(error);
    }
  },
  // ! LIGHT & FLASH Chart
  getlightChartData: async (id) => {
    if (!id) {
      return;
    }
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(
        `${base_url}get-pouss-light-chart/?lotId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(response);
      return { data, status: response.status };
    } catch (error) {
      console.error(error);
    }
  },
  // ! Consommation Chart
  getConsommationChartData: async (id) => {
    if (!id) {
      return;
    }
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(
        `${base_url}get-pouss-conso-chart/?lotId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(response);
      return { data, status: response.status };
    } catch (error) {
      console.error(error);
    }
  },
  // ! MORTALITE Chart
  getMortChartData: async (id) => {
    if (!id) {
      return;
    }
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(
        `${base_url}get-pouss-mort-chart/?lotId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(response);
      return { data, status: response.status };
    } catch (error) {
      console.error(error);
    }
  },

  // ! Temperature Chart
  temperatureChartData: async (id) => {
    if (!id) {
      return;
    }
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(
        `${base_url}get-pouss-temp-chart/?lotId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error(error);
    }
  },
};
export default api;
