const site = {
  "SIDI HMIDA": {
    production: [
      {
        id: 1,
        name: "B2",
        typeOf: "production",
        full: false,
        eleveur: 1,
        site: 1,
        nextDate: "2022-07-02",
        lot: [
          {
            id: 1,
            hebdoFill: false,
            archived: false,
            code: "LotCodeBAT1",
            effectifDP: 120000,
            birthDate: "2022-07-01",
            transferDate: "2023-03-01",
            reformStarted: false,
            batiment: 1,
            souche: 1,
          },
        ],
      },
      {
        id: 2,
        name: "B3",
        typeOf: "production",
        full: false,
        eleveur: 1,
        site: 1,
        nextWeek: "42",
        lot: [
          {
            id: 2,
            hebdoFill: true,
            archived: false,
            code: "LotCodeBAT2",
            effectifDP: 100000,
            birthDate: "2022-06-01",
            transferDate: "2023-03-01",
            reformStarted: false,
            batiment: 2,
            souche: 1,
          },
        ],
      },
    ],
    poussiniere: [],
  },
};
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

const Report = ({ CreateReports, lots, base_url }) => {
  // console.log(base_url);

  const [site, setSites] = useState(null);
  const [loading, setLoading] = useState(false);

  const dropState = useSelector((state) => state.userDrop.dropState);
  const modalState = useSelector((state) => state.showModal.modalState);
  const status = useSelector((state) => state.toggleLeftBar.status);
  const isVisualize = useSelector((state) => state.openSearchBar.isVisualize);
  const data = useSelector((state) => state.ShowBatimentCat.data);
  const formState = useSelector((state) => state.ShowBatimentCat.formState);

  let [ShowSites, setShowSites] = useState();

  const dispatch = useDispatch();
  let siteData;

  const FetchData = async () => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}site-data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
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
  // if (site !== null) {
  //   console.log(site[0].sites);
  // } else {
  //   console.log(null);
  // }

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
            ? (siteData = site[0].sites) && <BatimentBox siteData={siteData} />
            : site}
          {formState && (
            <BatimentForms
              CreateReports={CreateReports}
              data={data}
              lots={lots}
            />
          )}
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
const CreateReports = (e) => {
  e.preventDefault();
  let url = "https://savas-app-2000-default-rtdb.firebaseio.com/report.json";
  let report = {
    batimentId: props.batiment + mortRef.current.value.split(" ").join(""),
    batiment: props.batiment,
    production: productionRef.current.value,
    mortalite: mortRef.current.value,
    qteDeclasse: qteDeclasseRef.current.value,
    almntDist: alimntDistRef.current.value,
    mortCum: mortCumRef.current.value,
    pont: pontRef.current.value,
    nbrOeufsCum: nbrOeufsCumRef.current.value,
    poidVif: poidVifRef.current.value,
    homogeneite: homogenRef.current.value,
    poidsOeuf: poidsOeufRef.current.value,
    masOeufCum: masOeufCumRef.current.value,
    almCum: almCumRef.current.value,
    almSjt: almSjtRef.current.value,
    eau: eauRef.current.value,
    lumH: lumHRef.current.value,
    lumM: lumMRef.current.value,
    flashH: flashHRef.current.value,
    flashM: flashMRef.current.value,
    formPlc: formPlcRef.current.value,
    coloration: colorRef.current.value,
    qltCoq: qltCoqlRef.current.value,
    observation: inputVal,
  };
  console.log(report);
  console.log(typeof inputVal);

  props.CreateReports(report, url);
  e.target.reset();
};
