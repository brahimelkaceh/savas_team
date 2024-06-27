import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { closeDrop } from "../../slices/UserDrop";
import UseFetchData from "../../hooks/UseFetchData";
import UserManage from "./usersManage/Users";
import "./settings.css";
import Navbar from "../../components/navbar/Navbar";

let base_url = "https://farmdriver.savas.ma/api/";

const Users = () => {
  const status = useSelector((state) => state.toggleLeftBar.status);

  const isVisualize = useSelector((state) => state.openSearchBar.isVisualize);
  const dropState = useSelector((state) => state.userDrop.dropState);

  const dispatch = useDispatch();

  const apiUrl = useMemo(() => `${base_url}get-sites/`, [base_url]);

  const { data } = UseFetchData(apiUrl);

  return (
    <>
      <main className="page">
        {/* <Topbar /> */}
        <Navbar />
        <div className="settings-container">
          <UserManage siteName={data} />
        </div>
      </main>
    </>
  );
};

export default Users;
