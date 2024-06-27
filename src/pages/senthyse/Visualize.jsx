import React, { useContext, useEffect, useState } from "react";
import SiteBosx from "./components/SiteBosx";
import LotBox from "./components/LotBox";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "./visualize.css";
import LotContext, { LotProvider } from "./context/LotContext";
import Loader from "../../components/loader/Loader";

const Visualize = () => {
  const status = useSelector((state) => state.toggleLeftBar.status);
  const isVisualize = useSelector((state) => state.openSearchBar.isVisualize);
  const dropState = useSelector((state) => state.userDrop.dropState);
  const dispatch = useDispatch();
  const { sites, getAllSelectedLots, lotData, lotLoading } =
    useContext(LotContext);
  const [allCodeLot, setAllCodeLot] = useState([]);
  const [onAge, setOnAge] = useState(false);
  const [lot, setLots] = useState([]);
  const myFunction = (data) => {
    // console.log(data);
    setLots((prevData) => [data, ...prevData]);
  };

  useEffect(() => {
    console.log(lot);
  }, [lot]);

  const mergeAllCodeLot = (data) => {
    setAllCodeLot((prevData) => {
      const prevDataSet = new Set(prevData);
      const mergedArray = [...new Set([data, ...prevDataSet])];
      return mergedArray;
    });
  };

  return (
    <main className={status === true ? "page page-with-sidebar  " : "page  "}>
      <Topbar
        isVisualize={!isVisualize}
        onClick={() => dropState && dispatch(closeDrop())}
      />
      <Sidebar />

      <section className="visualize-page ">
        <div className="visualize-page-container">
          <div className="sites-box">
            {sites &&
              sites?.map((data, i) => (
                <SiteBosx
                  key={i}
                  data={data}
                  mergeAllCodeLot={mergeAllCodeLot}
                />
              ))}
            <div
              className="selected-sites-box"
              style={{
                width: "fit-content",
                background: "none",
                boxShadow: "none",
              }}
            >
              <button
                className="search-btn"
                onClick={() => {
                  getAllSelectedLots(allCodeLot);
                }}
              >
                <SearchIcon />
                <span>Recherche</span>
              </button>
            </div>
          </div>
          <div className="lot-box">
            <label className="cyberpunk-checkbox-label date-toggle">
              {onAge ? "" : "Age"}
              <input
                type="checkbox"
                className="switch"
                checked={onAge}
                onChange={(e) => {
                  setOnAge(!onAge);
                }}
              />
              {onAge ? "Date" : ""}
            </label>
            {lotLoading && <Loader />}
            {lotData?.map((data, i) => {
              return (
                <LotBox
                  data={data}
                  key={i}
                  onAge={onAge}
                  myFunction={myFunction}
                />
              );
            })}
            {/* <LotBox /> */}

            <div
              className="selected-sites-box"
              style={{
                width: "100%",
                background: "none",
                boxShadow: "none",
                alignItems: "flex-start",
              }}
            >
              <div
                className="button button-pdf"
                style={{
                  marginTop: "20px",
                  // width: "fit-content",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(pdfData);
                }}
              >
                <div className="button-wrapper">
                  <div className="text">Téléchargement... </div>
                  <span className="icon">
                    <svg
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                      height="2em"
                      width="2em"
                      role="img"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Visualize;
