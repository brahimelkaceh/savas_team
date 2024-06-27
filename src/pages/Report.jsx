import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/report.css";
import { AiFillSetting } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

import Modal from "../components/modals/Modal";
import Batiment from "../components/Batiment";
import Topbar from "../components/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { closeDrop } from "../slices/UserDrop";
import Sidebar from "../components/Sidebar";
import SitesBar from "../components/sitesBar/SitesBar";
import BatimentCat from "../components/batimentCat/BatimentCat";
import AuthContext from "../context/AuthContext";
import { dark } from "@mui/material/styles/createPalette";
import { isArray } from "@vue/shared";
import BatimentBox from "../components/batiment/BatimentBox";
import BatimentForms from "../components/batiment/BatimentForms";
import Form from "../components/Form";

const Report = ({ lots, base_url, CreateReports }) => {
  // console.log(base_url);

  const [site, setSites] = useState(null);
  const [loading, setLoading] = useState(false);

  const dropState = useSelector((state) => state.userDrop.dropState);
  const status = useSelector((state) => state.toggleLeftBar.status);
  const isVisualize = useSelector((state) => state.openSearchBar.isVisualize);
  const data = useSelector((state) => state.ShowBatimentCat.data);
  const formState = useSelector((state) => state.ShowBatimentCat.formState);

  const dispatch = useDispatch();
  let siteData;

  const FetchData = async () => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}site-data/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        console.log(JSON.parse(data));
        setSites(JSON.parse(data));
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <main className={status === true ? "page page-with-sidebar " : "page"}>
        <Topbar
          isVisualize={!isVisualize}
          onClick={() => dropState && dispatch(closeDrop())}
        />
        <Sidebar />

        <div className="site">
          {site !== null
            ? (siteData = site[0].sites) && (
                <BatimentBox
                  CreateReports={CreateReports}
                  siteData={siteData}
                />
              )
            : site}
        </div>

        {loading && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </main>
    </>
  );
};

export default Report;
