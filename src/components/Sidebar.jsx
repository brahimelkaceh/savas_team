import logo from "../assets/savas.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TableChartIcon from "@mui/icons-material/TableChart";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import SourceIcon from "@mui/icons-material/Source";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { FaTimes } from "react-icons/fa";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import "../styles/sidebar.css";
import { Link, NavLink } from "react-router-dom";
import DownloadBtn from "./buttons/DownloadBtn";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleLeftBar } from "../slices/LeftBar";
import PdfDownloadBtn from "./buttons/PdfDownloadBtn";
import { useState } from "react";
const Sidebar = ({}) => {
  const status = useSelector((state) => state.toggleLeftBar.status);
  const [date, setDate] = useState("");

  // console.log(status);
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <aside
      className={`${!status ? "sidebar" : "sidebar  show-sidebar"}`}
      // className="sidebar show-sidebar"
    >
      <div className="sidebar-header">
        <Link to="/">
          <div
            style={{
              "borderRadius": "50%",
              "width": "50px",
              "height": "50px",
              "background": "linear-gradient(145deg, #cacaca, #f0f0f0)",
            }}
          ></div>
          {/* <img src="" alt="Savas-logo" className="logo" /> */}
        </Link>

        <button
          className="close-btn"
          onClick={() => {
            dispatch(toggleLeftBar());
          }}
        >
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        <li>
          <ul className="sub-links">
            <NavLink
              to="/"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <DashboardIcon className="sidebar-icon" />
              <span>Accueil</span>
            </NavLink>
            <NavLink
              to="/report"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <NoteAddIcon className="sidebar-icon" />{" "}
              <span>Saisie de données</span>
            </NavLink>
            <NavLink
              to="/modification"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <TableChartIcon className="sidebar-icon" />
              <span>Performances en chiffres</span>
            </NavLink>
            {/* <NavLink
              to="/visualize"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <InsertDriveFileIcon className="sidebar-icon" />
              <span>Synthèse</span>
            </NavLink> */}
            <NavLink
              to="/charts"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <QueryStatsIcon className="sidebar-icon" />
              <span>Performances en courbes</span>
            </NavLink>

            <NavLink
              to="/lots"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <WorkspacesIcon className="sidebar-icon" />
              <span>Lots</span>
            </NavLink>
            <NavLink
              to="/souches"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <SourceIcon className="sidebar-icon" />
              <span>Guides de normes</span>
            </NavLink>
            <NavLink
              to="/settings"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <SettingsIcon className="sidebar-icon" />
              <span>Paramétrage</span>
            </NavLink>
            {/* <NavLink
              className={location.pathname === "/help" ? "active" : ""}
              to="/help"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <HelpCenterIcon className="sidebar-icon" />
              <span>Aide</span>
            </NavLink> */}
            {/* <NavLink
              to="/test"
              onClick={() => {
                dispatch(toggleLeftBar());
              }}
            >
              <HelpCenterIcon className="sidebar-icon" />
              <span>Index</span>
            </NavLink> */}
          </ul>
        </li>
      </ul>
      <span
        style={{
          zIndex: "100000",
          color: "#e5e5e5",
          fontSize: "11px",
          padding: "4px 18px",
          position: "absolute",
          top: "65%",
        }}
      >
        Synthese hébodmadaire des performance :
      </span>
      <div className="download-btn">
        <DownloadBtn content={"Sem en cours"} id={0} />
        <DownloadBtn content={"Sem en complétes"} id={1} />
        {/* État journaliére de production */}
      </div>

      <div className="btn-production">
        <span
          style={{
            zIndex: "100000",
            color: "#e5e5e5",
            fontSize: "11px",
            padding: "0px 18px",
          }}
        >
          État journaliére de production :
        </span>
        <div className="input-container">
          <input
            placeholder="Enter text"
            className="input-field"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <span className="input-highlight"></span>
        </div>

        <PdfDownloadBtn content={"Télecharger"} date={date} />
      </div>
    </aside>
  );
};

export default Sidebar;
