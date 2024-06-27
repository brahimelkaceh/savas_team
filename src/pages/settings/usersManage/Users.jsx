import { useState, useEffect } from "react";
import UsersManage from "./UsersManage";
import UsersTable from "./UsersTable";
import { useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";

let base_url = "https://farmdriver.savas.ma/api/";

function Users({ siteName }) {
  let renderData = useSelector((state) => state.getSiteData.renderData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUsersData = async () => {
    setLoading(true);

    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }

      const accessToken = authTokens.access;
      const response = await fetch(`${base_url}get-users/`, {
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
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsersData();
  }, [renderData]);
  return (
    <div className="users-settings">
      <UsersTable siteName={siteName} data={data} loading={loading} />
      <UsersManage siteName={siteName} />
    </div>
  );
}

export default Users;
