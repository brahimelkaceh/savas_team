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

      const response = await fetch(`${base_url}get-active-guides/?type=${1}`, {
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

      const response = await fetch(`${base_url}get-pouss-sites/`, {
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
      if (!id) {
        return;
      }
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}get-pouss-bats/?site=${id}`, {
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
  getPoussLot: async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(
        `${base_url}get-pouss-lots/?site=${id}&table=${1}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        return response.status;
      }
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error(error);
    }
  },
  createLot: async (data) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}add-lot/`, {
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
