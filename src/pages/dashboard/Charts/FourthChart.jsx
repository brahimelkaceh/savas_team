import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SkeletonBox from "../skeletons/SkeletonBox";
import AltChart from "../../../components/charts/AltChart";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Loader from "../../../components/loader/Loader";
import UseLocalStorageState from "../../../hooks/UseLocalStorageState";
import useCustomFetch from "../hooks/UseFetchData";
import { useState, useEffect } from "react";
import "./style.css";
import TempChart from "../../../components/charts/TempChart";

function FourthChart({ batSite, Sitesloading }) {
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState(0);

  const chipData = [
    { key: 7, label: "1S" },
    { key: 30, label: "1M" },
    { key: 365, label: "1AN" },
    { key: 0, label: "MAX" },
  ];
  const [id, setId] = useState(null);
  const [date, setDate] = UseLocalStorageState("ProdTime", 7);
  const { data, loading } = useCustomFetch(
    id ? id : batSite[0]?.id,
    date || date == 0 ? date : 7,
    "altoeuf-chart"
  );
  const fetchDataById = (id) => {
    setId(id);
  };

  const fetchDataByDate = (date) => {
    setDate(date);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeLabel = (event, newValue) => {
    console.log(newValue);
    setLabel(newValue);
    localStorage.setItem("altTime", newValue);
  };

  useEffect(() => {
    const savedLabel = localStorage.getItem("altTime") || 7;
    setLabel(Number(savedLabel));
    setValue(batSite[0].id);
  }, []);

  return (
    <>
      <ToggleButtonGroup
        sx={{
          display: "flex",
          justifyContent: "start",
          gap: "15px",
          flexWrap: "wrap",
          listStyle: "none",
          backgroundColor: "#c5dcfa80",
          boxShadow:
            " 0px 2px 4px 0px rgba(97, 97, 97, 0.2) inset, 0px 1px 2px 0px rgba(97, 97, 97, 0.2) inset",
          p: 0.2,
          m: 1,
        }}
        exclusive
        value={value}
        onChange={handleChange}
        aria-label="text alignment"
      >
        {batSite !== null &&
          batSite?.map((data) => {
            return (
              <ToggleButton
                key={data?.id}
                value={data?.id}
                aria-label="left aligned"
                onClick={() => fetchDataById(data.id)}
              >
                {data?.name}
              </ToggleButton>
            );
          })}
      </ToggleButtonGroup>
      {data !== null ? (
        <>
          <AltChart altData={data ? data : []} />
          {/* <TempChart /> */}

          <ToggleButtonGroup
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              flexWrap: "wrap",
              listStyle: "none",
              backgroundColor: "#c5dcfa80",
              boxShadow:
                " 0px 2px 4px 0px rgba(97, 97, 97, 0.2) inset, 0px 1px 2px 0px rgba(97, 97, 97, 0.2) inset",
              p: 0.2,
              m: 1,
            }}
            value={label}
            exclusive
            onChange={handleChangeLabel}
            aria-label="text alignment"
          >
            {chipData?.map((data) => {
              console.log(data);
              return (
                <ToggleButton
                  key={data?.key}
                  value={data?.key}
                  aria-label="left aligned"
                  onClick={() => fetchDataByDate(data.key)}
                >
                  {data?.label}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </>
      ) : (
        <SkeletonBox />
      )}
      {loading && <Loader />}
      {/* </div> */}
      {/* {loading && <SkeletonChart />} */}
    </>
  );
}

export default FourthChart;
