import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import UseLocalStorageState from "../../../hooks/UseLocalStorageState";
import ProductionChart from "./ProductionChart";
import Loader from "../../../components/loader/Loader";
import { Skeleton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./style.css";
import useCustomFetch from "../hooks/UseFetchData";

function FirstChart({ batSite, Sitesloading }) {
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState(0);
  const chipData = [
    { key: 7, label: "1S" },
    { key: 30, label: "1M" },
    { key: 365, label: "1AN" },
    { key: 0, label: "MAX" },
  ];
  const [id, setId] = useState(null);
  const [date, setDate] = UseLocalStorageState("ProdTime", 0);
  const { data, loading } = useCustomFetch(
    id ? id : false,
    date ? date : 7,
    "prod-chart"
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
    setLabel(newValue);
    localStorage.setItem("ProdTime", newValue);
  };

  useEffect(() => {
    const savedLabel = localStorage.getItem("ProdTime") || 7;
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
        <ToggleButton
          value={null}
          aria-label="left aligned"
          onClick={() => fetchDataById(false)}
        >
          Total
        </ToggleButton>
      </ToggleButtonGroup>
      <>
        {data !== null ? (
          <ProductionChart prodChart={data} />
        ) : (
          <ProductionChart prodChart={[]} />
        )}
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

      {loading && <Loader />}
    </>
  );
}

export default FirstChart;
