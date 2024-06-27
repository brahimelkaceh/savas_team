import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { closeDrop } from "../../slices/UserDrop";
import UseFetchData from "../../hooks/UseFetchData";
import UserManage from "./usersManage/Users";
import Sites from "./sitesManage/Sites";
import Bats from "./batsManage/Bats";
import "./settings.css";
import Navbar from "../../components/navbar/Navbar";
import api from "../../api/api";

let base_url = "https://farmdriver.savas.ma/api/";

const Settings = () => {
  const status = useSelector((state) => state.toggleLeftBar.status);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const result = await api.getAllSites();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, []);

  return (
    <>
      <main className={status === true ? "page page-with-sidebar " : "page"}>
        {/* <Topbar /> */}
        <Navbar />

        <div className="settings-container">
          <Bats siteName={data} />
        </div>
      </main>
    </>
  );
};

export default Settings;
// [10:50, 21/02/2024] Ahmed: get-bats/ : all bats
// get-sites/ : all sites
// [10:51, 21/02/2024] Ahmed: get-sites-titles/ : sites de production
// [10:51, 21/02/2024] Ahmed: get-pouss-sites/: sites de poussiniere
