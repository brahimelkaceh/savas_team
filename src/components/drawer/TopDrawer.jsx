import * as React from "react";
import "./topDrawer.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import SendBtn from "../buttons/SendBtn";
let base_url = "https://pouliprod.savas.ma/api/";

const TopDrawer = ({ data }) => {
  const sites = useSelector((state) => state.ShowBatimentCat.sites);
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [lotData, setLotData] = useState([]);
  let batimentIdRef = useRef();
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const placeDate = (dates) => {
    const dateNaissance = document.getElementById("date-naissance");
    const dateTransfert = document.getElementById("date-transfert");
    const dateMep = document.getElementById("date-mise-place");

    dateNaissance.type = "text";
    dateTransfert.type = "text";
    dateMep.type = "text";

    dateNaissance.value = dates.birthdate;
    dateTransfert.value = dates.transfert_date;
    dateMep.value = dates.mep_data;
  };

  const GetLotDetails = () => {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    fetch(`${base_url}get-lot-data/`, {
      method: "POST",
      body: JSON.stringify({
        "batiment": parseInt(batimentIdRef.current.value),
      }),
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.parse(data));
        setLotData(JSON.parse(data));
        // placeDate(lotData.birth, lotData.transfert_date, lotData.mep_data);
        placeDate(JSON.parse(data));
      })
      .catch((error) => console.error(error));
  };
  const handleFocusedElement = (e) => {
    if (e.target.value.length == 0) {
      e.target.type = "date";
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      className="drawer-container"
    >
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} className="top-drawer">
            <MdOutlineKeyboardArrowUp
              style={{ fontSize: "18px", color: "ff6000" }}
            />
          </Button>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            className="drawer-container"
          >
            <form className="form">
              <div className="input-container ic2">
                <select
                  name=""
                  className="input"
                  id="batiment"
                  ref={batimentIdRef}
                  onChange={GetLotDetails}
                  required
                >
                  <option value={null}>--</option>
                  {sites.map((site) => (
                    <option value={site.id} key={site.id}>
                      {site.name} -{site.site} ({site.type})
                    </option>
                  ))}
                </select>
                <label htmlFor="coloration" className="placeholder">
                  Bâtiment
                </label>
              </div>
              <div className="input-container ic2">
                <select name="souche" id="souche" className="input">
                  <option value={lotData.souche_id}>{lotData.souche}</option>
                  <option value="HISEX 2022">HISEX 2022</option>
                  <option value="HYLINE 2018">HYLINE 2018</option>
                  <option value="HYLINE 2022">HYLINE 2022</option>
                  <option value="LOHMANNE 2022">LOHMANNE 2022</option>
                </select>
                <label htmlFor="souche" className="placeholder">
                  Souches
                </label>
              </div>
              <div className="input-container ic2">
                <input
                  id="lotCode"
                  className="input"
                  type="text"
                  placeholder=" "
                  name="lotCode"
                  defaultValue={lotData.code}
                />
                <div className="cut"></div>
                <label htmlFor="lotCode" className="placeholder">
                  Lot Code
                </label>
              </div>
              <div className="input-container ic2">
                <input
                  id="effectif"
                  className="input"
                  type="number"
                  placeholder=" "
                  defaultValue={lotData?.effectifDP}
                  name="effectif"
                />
                <div className="cut"></div>
                <label htmlFor="effectif" className="placeholder">
                  Effectif
                </label>
              </div>

              <div className="input-container ic2">
                <input
                  name="dateNaissance"
                  id="date-naissance"
                  className="input"
                  type="text"
                  placeholder=" "
                  onFocus={handleFocusedElement}
                  onChange={handleFocusedElement}
                />
                <div className="cut"></div>
                <label htmlFor="date-naissance" className="placeholder">
                  Date de naissance
                </label>
              </div>
              <div className="input-container ic2">
                <input
                  name="dateMisePlace"
                  id="date-mise-place"
                  className="input"
                  type="text"
                  placeholder=" "
                  onFocus={handleFocusedElement}
                  onChange={handleFocusedElement}
                />
                <div className="cut"></div>
                <label htmlFor="date-mise-place" className="placeholder">
                  Date de mise en place
                </label>
              </div>
              <div className="input-container ic2">
                <input
                  name="dateTransfert"
                  id="date-transfert"
                  className="input"
                  type="text"
                  onFocus={handleFocusedElement}
                  onChange={handleFocusedElement}
                  placeholder=" "
                />
                <div className="cut"></div>
                <label htmlFor="date-transfert" className="placeholder">
                  Date de transfert
                </label>
              </div>
              <div
                // className={`${
                //   disabled
                //     ? "checkbox-input-container-disabled ic2"
                //     : "check-input-container ic2"
                // }`}
                className="check-input-container ic2"
              >
                <label htmlFor="reform-lot" className="placehold">
                  En Reformée
                </label>
                <input
                  type="checkbox"
                  name="reformLot"
                  id="reform-lot"
                  className="checkbox-input"
                  // disabled={modifyReform === false ? "disabled" : ""}
                  // defaultChecked={modifyReform === true ? "" : "checked "}

                  // disabled={!disabled}
                />
              </div>
              <div className="input-container ic2">
                <div className="cut"></div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <SendBtn />
              </div>
            </form>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TopDrawer;
