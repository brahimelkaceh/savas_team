let base_url = "https://farmdriver.savas.ma/api/";

const api = {
  getLotPrefiled: async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}get-lot-prefiled/?lotId=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getActiveGuides: async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}get-active-guides/?type=${0}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getSites: async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}get-sites/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getBatsData: async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}get-site-bats/?site=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  UpdateLot: async (data) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}update-lot/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return 200;
    } catch (error) {
      console.error(error);
    }
  },
};

export default api;
