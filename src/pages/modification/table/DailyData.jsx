import React, { useState } from "react";
import HoverPopper from "../../../components/popper/HoverPopper";
import MouseOverPopover from "../../../components/popper/MouseOverPopover";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { useDispatch } from "react-redux";
import { getRepportId } from "../../../slices/EditReport";
import DailyDataTd from "./DailyDataTd";
function DailyData({
  dailyData,
  setOpenDeleteModal,
  setOpenEditModal,
  openEditModal,
  i,
  showDailyTable,
  isReform,
}) {
  // showDailyTable && console.log(i);
  //! This function is used to open the delete modal.
  const handleDeleteModal = () => setOpenDeleteModal(true);

  //! This function is used to open the edit modal.
  const handleEditOpen = () => setOpenEditModal(true);

  const dispatch = useDispatch();

  return (
    <>
      {openEditModal && (
        <EditRepport
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
      {dailyData &&
        dailyData[i]?.map((data, index) => {
          console.log();
          return (
            <>
              <tr
                key={index}
                className={
                  data?.lot_id
                    ? "daily-data scale-in-ver-top hidden"
                    : "scale-in-ver-top daily-tr"
                }
              >
                <td
                  className={
                    !data?.lot_id ? "border-right " : "border-top border-right "
                  }
                  rowSpan={2}
                >
                  {!data?.lot_id && (
                    <div className="actions">
                      <button
                        className="edit"
                        style={{
                          display: data.length === 0 ? "none" : " ",
                        }}
                        onClick={() => {
                          handleEditOpen();
                          dispatch(getRepportId(data.id));
                        }}
                      >
                        <EditIcon />
                      </button>
                      {data.deletable && (
                        <button
                          className="delete"
                          onClick={() => {
                            handleDeleteModal();
                            dispatch(getRepportId(data.id));
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      )}
                    </div>
                  )}
                  {/* <button className="download">
                  <DownloadIcon />
                </button> */}
                </td>
                {/* calendrier */}
                <td rowSpan={2} className="border-top">
                  {data?.calendrier?.semCivil}
                </td>
                <td rowSpan={2} className="border-top">
                  {data?.calendrier?.date}
                </td>
                <td rowSpan={2} className="border-right border-top">
                  {data?.calendrier?.age}
                </td>
                {/* Ambiance */}
                <td rowSpan={2} className="border-top">
                  <HoverPopper
                    data={
                      data?.ambiance?.lumiere ? data?.ambiance?.lumiere : "--"
                    }
                    fontSize={15}
                  />
                </td>
                <td rowSpan={2} className="border-top">
                  <HoverPopper
                    data={data?.ambiance?.flash ? data?.ambiance?.flash : "--"}
                    fontSize={15}
                  />
                </td>
                <td rowSpan={2} className="border-right border-top">
                  {data?.ambiance?.intensite} {data?.ambiance?.intensite_unit}
                </td>
                <td className="border-right border-top" rowSpan={2}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#5272F2",
                    }}
                  >
                    {data?.ambiance?.temperature.min}°
                  </span>
                  /
                  <span style={{ color: "#C70039" }}>
                    {data?.ambiance?.temperature.max}°
                  </span>
                </td>
                {/* Viabilité */}
                <td rowSpan={2} className="border-top">
                  {data?.viabilite?.effectif}
                </td>
                <DailyDataTd
                  lot_id={data?.lot_id}
                  className={"border-top"}
                  data={data?.viabilite?.homog ? data?.viabilite?.homog : "0%"}
                />
                <DailyDataTd
                  className={"border-top"}
                  lot_id={data?.lot_id}
                  data={
                    data?.viabilite?.poid_vif ? data?.viabilite?.poid_vif : "0"
                  }
                />
                <td className="border-top" rowSpan={2}>
                  {data?.viabilite?.viabilite
                    ? data?.viabilite?.viabilite + "%"
                    : "--"}
                </td>
                <DailyDataTd
                  className={"border-top"}
                  lot_id={data?.lot_id}
                  data={
                    data?.viabilite?.nbr_mort_jour
                      ? data?.viabilite?.nbr_mort_jour
                      : "--"
                  }
                />
                <DailyDataTd
                  className={"border-top"}
                  lot_id={data?.lot_id}
                  data={data?.viabilite?.cent_mort_sem}
                  secondaryData={data?.viabilite?.nbr_mort_sem}
                />
                {/* Consommation */}
                <td className="border-left border-top" rowSpan={2}>
                  {data?.consommation?.eau_dist}
                </td>
                <td rowSpan={2} className="border-top">
                  {data?.consommation?.alt_dist}
                </td>
                <td rowSpan={2} className="border-top">
                  {data?.consommation?.eps}
                </td>
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={data?.consommation?.aps || "--"}
                />
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={data?.consommation?.alt_cuml}
                />
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={data?.consommation?.ratio || "--"}
                />
                <td className="border-right border-top" rowSpan={2}>
                  {data?.consommation?.formule_ep || "--"}
                </td>
                {/* Production */}
                <td className="border-top">{data?.production?.ponte_nbr}</td>
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={
                    data?.production?.ponte_cent
                      ? data?.production?.ponte_cent
                      : "0"
                  }
                />
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={data?.production?.pmo ? data?.production?.pmo : "0"}
                />
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={data?.production?.noppp ? data?.production?.noppp : "0"}
                />
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={
                    data?.production?.noppp_cuml_jr
                      ? data?.production?.noppp_cuml_jr
                      : "0"
                  }
                />
                <DailyDataTd
                  className={"border-right border-top"}
                  lot_id={data?.lot_id}
                  data={data?.production?.noppd ? data?.production?.noppd : "0"}
                />
                <DailyDataTd
                  className={"border-right border-top"}
                  lot_id={data?.lot_id}
                  data={
                    data?.production?.noppd_cuml_jr
                      ? data?.production?.noppd_cuml_jr
                      : "0"
                  }
                />
                <td rowSpan={2} className="border-top">
                  {data?.production?.declassed}
                </td>

                {/* Mass oeuf */}
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={
                    data?.mass_oeuf?.mass_oeuf_sem_pp
                      ? data.mass_oeuf?.mass_oeuf_sem_pp
                      : "0"
                  }
                />
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={
                    data?.mass_oeuf?.mass_oeuf_pp
                      ? data.mass_oeuf?.mass_oeuf_pp
                      : "0"
                  }
                />
                <DailyDataTd
                  className={"border-right border-top"}
                  lot_id={data?.lot_id}
                  data={
                    data?.mass_oeuf?.mass_oeuf_pd
                      ? data?.mass_oeuf?.mass_oeuf_pd
                      : "0"
                  }
                />
                <DailyDataTd
                  className={"border-right border-top"}
                  lot_id={data?.lot_id}
                  data={
                    data?.mass_oeuf?.mass_oeuf_sem_pd
                      ? data?.mass_oeuf?.mass_oeuf_sem_pd
                      : "0"
                  }
                />

                {/* Aliment / OEUF */}
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={data?.indice_conver?.alt_oeuf}
                  secondaryData={data?.indice_conver?.alt_oeuf_jr}
                />
                <DailyDataTd
                  className="border-top"
                  lot_id={data?.lot_id}
                  data={data?.indice_conver?.alt_oeuf_cuml}
                  secondaryData={data?.indice_conver?.alt_oeuf_jr_cuml}
                />
                {/* Indice de convertion */}

                <td className="border-top border-right" rowSpan={2}>
                  {data?.lot_id
                    ? data?.indice_conver?.ic_sem
                    : data?.indice_conver?.ic}
                </td>
                {isReform && (
                  <td className="border-top border-right" rowSpan={2}>
                    {data?.reform?.hensReformed}
                  </td>
                )}
              </tr>
              <tr>
                <td
                  className={"border-top"}
                  // style={{ fontSize: "13px", fontWeight: "400" }}
                  style={{
                    color: `${data?.production?.ponte_var.color}`,
                    backgroundColor: "#fff",
                    textDecoration: "underline",
                    fontSize: "13px",
                    fontWeight: "400",
                  }}
                >
                  {data?.production?.ponte_var.reel}
                </td>
                {/* <td
                  className={`${data?.production?.ponte_var.color} "border-top"`}
                  style={{ fontSize: "13px", fontWeight: "400" }}
                >
                  {data?.production?.ponte_var.reel}
                </td> */}
              </tr>
            </>
          );
        })}
    </>
  );
}

export default DailyData;
