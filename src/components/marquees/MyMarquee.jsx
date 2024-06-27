import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { useMemo } from "react";
import UseFetchData from "../../hooks/UseFetchData";
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";
import { PostAdd } from "@mui/icons-material";
import ObservationModal from "../../pages/dashboard/modals/ObservationModal";
import { Alert, Avatar, IconButton, Stack, SvgIcon } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

// dash-marquee-data/
const MyMarquee = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const ApiUrl = useMemo(() => `${base_url}dash-marquee-data/`, [base_url]);

  const { data, loading, error } = UseFetchData(ApiUrl, "GET");
  if (error) {
    return (
      <Marquee
        style={{
          backgroundColor: "#E96D711a",
          color: "#c21d03",
        }}
      >
        <div>
          <p>Aucune donnée à afficher</p>
        </div>
      </Marquee>
    );
  }
  return (
    <Stack flexDirection={"row"}>
      {/* <IconButton size="small" color="primary" onClick={() => setOpen(true)}>
        <SvgIcon>
          <PostAdd />
        </SvgIcon>
      </IconButton> */}
      {open && <ObservationModal open={open} handleClose={handleClose} />}
      <Marquee speed={30}>
        {loading && <p>loading...</p>}
        {/* <Alert
          color="info"
          icon={false}
          sx={{
            py: 0,
            px: 0.5,
            mx: 1,
          }}
        >
          <Stack flexDirection={"row"} alignItems={"center"}>
            Aut quae consequatur
          </Stack>
        </Alert>
        <Alert
          color="success"
          icon={false}
          sx={{
            py: 0,
            px: 0.5,
            mx: 1,
          }}
        >
          <Stack flexDirection={"row"} alignItems={"center"}>
            Aut quae consequatur
          </Stack>
        </Alert>
        <Alert
          color="error"
          icon={false}
          sx={{
            py: 0,
            px: 0.5,
            mx: 1,
          }}
        >
          <Stack flexDirection={"row"} alignItems={"center"}>
            Aut quae consequatur
          </Stack>
        </Alert> */}
        {data && (
          <div className="good-marquee">
            <span className="">{data[0]?.site} :</span>
            <span className="param-title"> ponte : </span>
            {data[0]?.ponte?.map((p, i) => {
              console.log(p);
              return (
                <div
                  key={i}
                  style={{
                    padding: "0 2px",
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  {p?.best_ponte && (
                    <span className="good-param">
                      {p?.best_ponte?.bat} : {p?.best_ponte?.reel}
                      {p?.best_ponte && <IoMdArrowDropupCircle />}
                    </span>
                  )}
                  {p?.worst_ponte && (
                    <span className="bad-param">
                      {p?.worst_ponte?.bat} : {p?.worst_ponte?.reel}
                      {p?.worst_ponte && <IoMdArrowDropdownCircle />}
                    </span>
                  )}
                </div>
              );
            })}
            |<span className="param-title"> PMO : </span>
            {data[0]?.pmo?.map((p, i) => {
              return (
                <div
                  key={i}
                  style={{ padding: "0 2px", display: "flex", gap: "6px" }}
                >
                  {p?.best_pmo && (
                    <span className="good-param">
                      {p?.best_pmo?.bat} : {p?.best_pmo?.reel}
                    </span>
                  )}

                  {p?.worst_pmo && (
                    <span className="bad-param">
                      {p?.worst_pmo?.bat} : {p?.worst_pmo?.reel}
                      {p?.worst_pmo && <IoMdArrowDropdownCircle />}
                    </span>
                  )}
                </div>
              );
            })}
            |<span className="param-title"> mortalité : </span>
            {data[0]?.mort?.map((p, i) => {
              return (
                <div
                  key={i}
                  style={{ padding: "0 2px", display: "flex", gap: "6px" }}
                >
                  {p?.best_mort && (
                    <span className="good-param">
                      {p?.best_mort?.bat} : {p?.best_mort?.reel}
                    </span>
                  )}
                  {p?.worst_mort && (
                    <span className="bad-param">
                      {p?.worst_mort?.bat} : {p?.worst_mort?.reel}
                      {p?.worst_mort && <IoMdArrowDropdownCircle />}
                    </span>
                  )}
                </div>
              );
            })}
            |<span className="param-title"> aliment / oeuf : </span>
            {data[0]?.altOeuf?.map((p, i) => {
              return (
                <div
                  key={i}
                  style={{ padding: "0 2px", display: "flex", gap: "6px" }}
                >
                  {p?.best_altOeuf && (
                    <span className="good-param">
                      {p?.best_altOeuf?.bat} : {p?.best_altOeuf?.reel}
                    </span>
                  )}
                  {p?.worst_altOeuf && (
                    <span className="bad-param">
                      {p?.worst_altOeuf?.bat} : {p?.worst_altOeuf?.reel}
                      {p?.worst_altOeuf && <IoMdArrowDropdownCircle />}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Marquee>
    </Stack>
  );
};

export default MyMarquee;
