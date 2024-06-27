import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import WeeklyTableHeader from "./WeeklyTableHeader";
import FixedHeader from "./FixedHeader";
import DailyData from "./DailyData";
import MouseOverPopover from "../../../components/popper/MouseOverPopover";
import HoverPopper from "../../../components/popper/HoverPopper";
import DeleteReport from "../models/DeleteReport";
import EditRepport from "../models/EditRepport";
import DownloadIcon from "@mui/icons-material/Download";
import UseFetchData from "../../../hooks/UseFetchData";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableDetailModal from "../models/TableDetailModal";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Loader from "../../../components/loader/Loader";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import api from "../../../api/api";
import toast, { Toaster } from "react-hot-toast";
let base_url = "https://farmdriver.savas.ma/api/";

function DataTable({ setLoading, loading, isReform }) {
  const lotTableId = useSelector((state) => state.toggleLeftBar.lotTableId);
  let renderData = useSelector((state) => state.getSiteData.renderData);
  let refreshData = useSelector((state) => state.getSiteData.refreshData);

  const [age, setAge] = useState("");
  const [tableData, setTableData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTableDetailModal, setOpenTableDetailModal] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [elementVisibility, setElementVisibility] = useState({});

  const toggleVisibility = (elementId) => {
    setElementVisibility((prevState) => ({
      ...prevState,
      [elementId]: !prevState[elementId],
    }));
  };
  const getRepportData = async (id) => {
    setLoading(true);
    setTableData([]);
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }

      const accessToken = authTokens.access;
      const response = await fetch(`${base_url}get-table-data/?lotId=${id}`, {
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
      if (response.ok) {
        setTableData(data);
        setLoading(false);
      }
    } catch (pdfError) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  //! Extract the last element from each sub-array in 'data'
  const [weeklyData, setWeeklyData] = useState([]);
  const [newWeeklyData, setNewWeeklyData] = useState([]);

  const handleWeekPdfClick = async (id, age) => {
    try {
      setPdfLoading(true);
      await api.productionWeekPdf(id, age);
      toast.success("PDF téléchargé avec succès !");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Échec du téléchargement du PDF. Veuillez réessayer plus tard."
      );
    } finally {
      setPdfLoading(false); // Set loading to false when the fetch is complete
    }
  };
  useEffect(() => {
    getRepportData(lotTableId);
  }, [lotTableId, refreshData]);

  useEffect(() => {
    setWeeklyData(tableData?.map((d) => d[d.length - 1]));
    //! Filter 'weeklyData' array to keep objects with at least one non-empty value
  }, [refreshData, tableData]);
  useEffect(() => {
    setNewWeeklyData(
      weeklyData?.filter((obj) =>
        //   //! Check if any value in the object is not an empty string
        Object.values(obj).some((value) => value !== "")
      )
    );
  }, [refreshData, weeklyData]);

  useEffect(() => {
    setWeeklyData([]);
  }, [renderData]);

  return (
    <div className="modification-table-container">
      <Toaster gutter={8} position="bottom-right" reverseOrder={false} />
      {pdfLoading && <LinearProgress color="success" />}
      {openDeleteModal && (
        <DeleteReport
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {openEditModal && (
        <EditRepport
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
      {openTableDetailModal && (
        <TableDetailModal
          open={openTableDetailModal}
          setOpen={setOpenTableDetailModal}
          age={age}
          lotId={lotTableId}
        />
      )}

      <table>
        <thead className="sticky-header">
          <FixedHeader
            elementVisibility={elementVisibility}
            isReform={isReform}
          />
        </thead>

        {newWeeklyData &&
          newWeeklyData.map((d, i) => {
            return (
              <tbody
                key={i}
                className={
                  elementVisibility[i] ? "my-tbody-active" : "my-tbody"
                }
              >
                {elementVisibility[i] && (
                  <DailyData
                    dailyData={tableData?.map((d) => d.slice(0, -1))}
                    i={i}
                    setOpenDeleteModal={setOpenDeleteModal}
                    setOpenEditModal={setOpenEditModal}
                    isReform={isReform}
                  />
                )}
                <WeeklyTableHeader i={i} toggleVisibility={toggleVisibility} />

                <tr
                  className={
                    elementVisibility[i]
                      ? "weekly-body-tr active-tr"
                      : "weekly-body-tr"
                  }
                  style={{
                    border: "none !important",
                  }}
                >
                  <td rowSpan={2} className="border-right">
                    <div className="actions">
                      <button className="download">
                        <DownloadIcon
                          onClick={() => {
                            handleWeekPdfClick(
                              lotTableId,
                              newWeeklyData[i]?.calendrier?.age
                            );
                          }}
                        />
                      </button>

                      <button
                        className="download"
                        style={{ backgroundColor: "#194058", color: "#FFFFFF" }}
                      >
                        <TableRowsIcon
                          onClick={() => {
                            setOpenTableDetailModal(true);
                            setAge(newWeeklyData[i]?.calendrier?.age);
                          }}
                        />
                      </button>
                      <button
                        className="show-action"
                        onClick={() => {
                          toggleVisibility(i);
                        }}
                      >
                        {elementVisibility[i] ? (
                          <KeyboardArrowUpIcon fontSize="small" />
                        ) : (
                          <KeyboardArrowDownIcon fontSize="small" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td rowSpan={2}>{newWeeklyData[i]?.calendrier?.semCivil}</td>
                  <td rowSpan={2}>{newWeeklyData[i]?.calendrier?.date}</td>
                  <td className="border-right" rowSpan={2}>
                    {newWeeklyData[i]?.calendrier?.age}
                  </td>
                  {/* Ambiance */}
                  <td rowSpan={2}>
                    <HoverPopper
                      data={newWeeklyData[i]?.ambiance.lumiere || "--"}
                      fontSize={15}
                    />
                  </td>
                  <td rowSpan={2}>
                    <HoverPopper
                      data={newWeeklyData[i]?.ambiance.flash || "--"}
                      fontSize={15}
                    />
                  </td>
                  <td className="border-right" rowSpan={2}>
                    {newWeeklyData[i]?.ambiance?.intensite}
                  </td>
                  <td className="border-right" rowSpan={2}>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#5272F2",
                      }}
                    >
                      {newWeeklyData[i]?.ambiance?.temperature.min}°
                    </span>
                    /
                    <span style={{ color: "#C70039" }}>
                      {newWeeklyData[i]?.ambiance?.temperature.max}°
                    </span>
                  </td>
                  {/* Viabilité */}
                  <td rowSpan={2}>{newWeeklyData[i]?.viabilite?.effectif}</td>
                  <td>
                    {newWeeklyData[i]?.viabilite?.homog?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.viabilite?.homog?.guide}
                      reel={newWeeklyData[i]?.viabilite?.homog?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td>
                    {newWeeklyData[i]?.viabilite?.poid_vif?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.viabilite?.poid_vif?.guide}
                      reel={newWeeklyData[i]?.viabilite?.poid_vif?.reel}
                      fontSize={15}
                    /> */}
                  </td>

                  <td rowSpan={2}>{newWeeklyData[i]?.viabilite?.viabilite}%</td>
                  <td>
                    {newWeeklyData[i]?.viabilite?.cent_mort_sem.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.viabilite?.cent_mort_sem?.guide}
                      reel={newWeeklyData[i]?.viabilite?.cent_mort_sem.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td className="border-right">
                    {newWeeklyData[i]?.viabilite?.cent_mort_cuml?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.viabilite?.cent_mort_cuml?.guide}
                      reel={newWeeklyData[i]?.viabilite?.cent_mort_cuml?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  {/* Consommation */}
                  <td rowSpan={2}>
                    {newWeeklyData[i]?.consommation?.eau_dist}
                  </td>
                  <td rowSpan={2}>
                    {newWeeklyData[i]?.consommation?.alt_dist}
                  </td>
                  <td rowSpan={2}>{newWeeklyData[i]?.consommation?.eps}</td>
                  <td>
                    {newWeeklyData[i]?.consommation?.aps?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.consommation?.aps?.guide}
                      reel={newWeeklyData[i]?.consommation?.aps?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td>
                    {newWeeklyData[i]?.consommation?.alt_cuml?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.consommation?.alt_cuml?.guide}
                      reel={newWeeklyData[i]?.consommation?.alt_cuml?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td>
                    {newWeeklyData[i]?.consommation?.ratio?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.consommation?.ratio?.guide}
                      reel={newWeeklyData[i]?.consommation?.ratio?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td rowSpan={2} className="border-right">
                    {newWeeklyData[i]?.consommation?.formule_ep
                      ? newWeeklyData[i]?.consommation?.formule_ep
                      : "--"}
                  </td>
                  {/* PRODUCTION */}
                  <td>{newWeeklyData[i]?.production?.ponte_nbr}</td>
                  <td>
                    {newWeeklyData[i]?.production?.ponte_cent?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.ponte_cent?.guide}
                      reel={newWeeklyData[i]?.production?.ponte_cent?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td>
                    {newWeeklyData[i]?.production?.pmo?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.pmo?.guide}
                      reel={newWeeklyData[i]?.production?.pmo?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td>
                    {newWeeklyData[i]?.production?.noppp_cuml_sem?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.noppp?.guide}
                      reel={newWeeklyData[i]?.production?.noppp?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td>
                    {newWeeklyData[i]?.production?.noppp?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.noppp?.guide}
                      reel={newWeeklyData[i]?.production?.noppp?.reel}
                      fontSize={15}
                    /> */}
                  </td>

                  <td className="border-right">
                    {newWeeklyData[i]?.production?.noppd_cuml_sem?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.noppd?.guide}
                      reel={newWeeklyData[i]?.production?.noppd?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td className="border-right">
                    {newWeeklyData[i]?.production?.noppd?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.noppd?.guide}
                      reel={newWeeklyData[i]?.production?.noppd?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td>{newWeeklyData[i]?.production?.declassed}</td>
                  {/* Mass OEUF */}

                  <td>{newWeeklyData[i]?.mass_oeuf?.mass_oeuf_sem_pp.reel}</td>
                  <td>{newWeeklyData[i]?.mass_oeuf?.mass_oeuf_pp?.reel}</td>
                  <td className="border-right">
                    {newWeeklyData[i]?.mass_oeuf?.mass_oeuf_sem_pd.reel}
                  </td>
                  <td className="border-right">
                    {newWeeklyData[i]?.mass_oeuf?.mass_oeuf_pd?.reel}
                  </td>

                  {/* Aliment / Oeuf */}
                  <td>
                    {newWeeklyData[i]?.indice_conver?.alt_oeuf?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.indice_conver?.alt_oeuf?.guide}
                      reel={newWeeklyData[i]?.indice_conver?.alt_oeuf?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  <td>
                    {newWeeklyData[i]?.indice_conver?.alt_oeuf_cuml?.reel}
                    {/* <MouseOverPopover
                      guide={
                        newWeeklyData[i]?.indice_conver?.alt_oeuf_cuml?.guide
                      }
                      reel={
                        newWeeklyData[i]?.indice_conver?.alt_oeuf_cuml?.reel
                      }
                      fontSize={15}
                    /> */}
                  </td>
                  <td className="border-right">
                    {newWeeklyData[i]?.indice_conver?.ic_cuml?.reel}
                    {/* <MouseOverPopover
                      guide={newWeeklyData[i]?.indice_conver?.ic_cuml?.guide}
                      reel={newWeeklyData[i]?.indice_conver?.ic_cuml?.reel}
                      fontSize={15}
                    /> */}
                  </td>
                  {isReform && (
                    <td rowSpan={2} className="border-right">
                      {newWeeklyData[i]?.reform?.reform || "--"}
                    </td>
                  )}
                </tr>
                <tr
                  className={
                    elementVisibility[i]
                      ? "weekly-body-tr active-tr"
                      : "weekly-body-tr"
                  }
                >
                  {/* Viabilité */}
                  <td className={newWeeklyData[i]?.viabilite?.homog?.color}>
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.viabilite?.homog?.guide}
                      reel={newWeeklyData[i]?.viabilite?.homog?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td className={newWeeklyData[i]?.viabilite?.poid_vif?.color}>
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.viabilite?.poid_vif?.guide}
                      reel={newWeeklyData[i]?.viabilite?.poid_vif?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={
                      newWeeklyData[i]?.viabilite?.cent_mort_sem?.color
                    }
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.viabilite?.cent_mort_sem?.guide}
                      reel={newWeeklyData[i]?.viabilite?.cent_mort_sem?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={
                      newWeeklyData[i]?.viabilite?.cent_mort_cuml?.color +
                      " border-right"
                    }
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.viabilite?.cent_mort_cuml?.guide}
                      reel={newWeeklyData[i]?.viabilite?.cent_mort_cuml?.ecart}
                      fontSize={15}
                    />
                  </td>
                  {/* Consommation */}
                  <td className={newWeeklyData[i]?.consommation?.aps?.color}>
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.consommation?.aps?.guide}
                      reel={newWeeklyData[i]?.consommation?.aps?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={newWeeklyData[i]?.consommation?.alt_cuml?.color}
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.consommation?.alt_cuml?.guide}
                      reel={newWeeklyData[i]?.consommation?.alt_cuml?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td className={newWeeklyData[i]?.consommation?.ratio?.color}>
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.consommation?.ratio?.guide}
                      reel={newWeeklyData[i]?.consommation?.ratio?.ecart}
                      fontSize={15}
                    />
                  </td>
                  {/* PRODUCTION */}
                  <td
                    style={{
                      color: `${newWeeklyData[i]?.production?.ponte_var.color}`,
                      backgroundColor: "#fff",
                      textDecoration: "underline",
                    }}
                  >
                    {newWeeklyData[i]?.production?.ponte_var?.reel}
                  </td>
                  <td
                    className={newWeeklyData[i]?.production?.ponte_cent?.color}
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.ponte_cent?.guide}
                      reel={newWeeklyData[i]?.production?.ponte_cent?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td className={newWeeklyData[i]?.production?.pmo?.color}>
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.pmo?.guide}
                      reel={newWeeklyData[i]?.production?.pmo?.ecart}
                      fontSize={15}
                    />
                  </td>{" "}
                  <td
                    className={
                      newWeeklyData[i]?.production?.noppp_cuml_sem?.color +
                      " border-right"
                    }
                  >
                    <MouseOverPopover
                      guide={
                        newWeeklyData[i]?.production?.noppp_cuml_sem?.guide
                      }
                      reel={newWeeklyData[i]?.production?.noppp_cuml_sem?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={
                      newWeeklyData[i]?.production?.noppp?.color +
                      " border-right"
                    }
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.noppp?.guide}
                      reel={newWeeklyData[i]?.production?.noppp?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={
                      newWeeklyData[i]?.production?.noppd_cuml_sem?.color
                    }
                  >
                    <MouseOverPopover
                      guide={
                        newWeeklyData[i]?.production?.noppd_cuml_sem?.guide
                      }
                      reel={newWeeklyData[i]?.production?.noppd_cuml_sem?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td className={newWeeklyData[i]?.production?.noppd?.color}>
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.production?.noppd?.guide}
                      reel={newWeeklyData[i]?.production?.noppd?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td>{newWeeklyData[i]?.production?.declassed_cent}%</td>
                  {/* Mass OEUF */}
                  <td
                    className={
                      newWeeklyData[i]?.mass_oeuf?.mass_oeuf_sem_pp?.color
                    }
                  >
                    <MouseOverPopover
                      guide={
                        newWeeklyData[i]?.mass_oeuf?.mass_oeuf_sem_pp?.guide
                      }
                      reel={
                        newWeeklyData[i]?.mass_oeuf?.mass_oeuf_sem_pp?.ecart
                      }
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={newWeeklyData[i]?.mass_oeuf?.mass_oeuf_pp?.color}
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.mass_oeuf?.mass_oeuf_pp?.guide}
                      reel={newWeeklyData[i]?.mass_oeuf?.mass_oeuf_pp?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={
                      newWeeklyData[i]?.mass_oeuf?.mass_oeuf_sem_pd?.color +
                      " border-right"
                    }
                  >
                    <MouseOverPopover
                      guide={
                        newWeeklyData[i]?.mass_oeuf?.mass_oeuf_sem_pd?.guide
                      }
                      reel={
                        newWeeklyData[i]?.mass_oeuf?.mass_oeuf_sem_pd?.ecart
                      }
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={
                      newWeeklyData[i]?.mass_oeuf?.mass_oeuf_pd?.color +
                      " border-right"
                    }
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.mass_oeuf?.mass_oeuf_pd?.guide}
                      reel={newWeeklyData[i]?.mass_oeuf?.mass_oeuf_pd?.ecart}
                      fontSize={15}
                    />
                  </td>
                  {/* Aliment / Oeuf */}
                  <td
                    className={newWeeklyData[i]?.indice_conver?.alt_oeuf?.color}
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.indice_conver?.alt_oeuf?.guide}
                      reel={newWeeklyData[i]?.indice_conver?.alt_oeuf?.ecart}
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={
                      newWeeklyData[i]?.indice_conver?.alt_oeuf_cuml?.color
                    }
                  >
                    <MouseOverPopover
                      guide={
                        newWeeklyData[i]?.indice_conver?.alt_oeuf_cuml?.guide
                      }
                      reel={
                        newWeeklyData[i]?.indice_conver?.alt_oeuf_cuml?.ecart
                      }
                      fontSize={15}
                    />
                  </td>
                  <td
                    className={
                      newWeeklyData[i]?.indice_conver?.ic_cuml?.color +
                      " border-right"
                    }
                  >
                    <MouseOverPopover
                      guide={newWeeklyData[i]?.indice_conver?.ic_cuml?.guide}
                      reel={newWeeklyData[i]?.indice_conver?.ic_cuml?.ecart}
                      fontSize={15}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
}

export default DataTable;
