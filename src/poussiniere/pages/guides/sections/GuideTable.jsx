import React from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
// import EditGuide from "./Editguide";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { getguideId } from "../../../../slices/LeftBar";
let base_url = "https://farmdriver.savas.ma/api/";

function GuideTable(GetGuideData) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [guideTitle, setGuidetitle] = useState();
  const dispatch = useDispatch();
  const GetGuideTitle = async () => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}get-guides-titles/?type=1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        // console.log(JSON.parse(data));
        setGuidetitle(data);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const FetchGuideStatus = async (guideId) => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(
        `${base_url}toggle-guide-activation/?guide_id=${guideId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        // console.log(response.status)
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetGuideTitle();
    FetchGuideStatus();
  }, []);

  return (
    <div className="guide-container">
      {guideTitle !== undefined ? (
        guideTitle.map((title, i) => {
          // console.log(title.is_active);
          return (
            <div
              key={i}
              className="guide-table bats-poss-table slit-in-horizontal"
            >
              {open && <EditGuide setOpen={setOpen} open={open} />}
              <div className="guide ">
                <div className="guide-name">{title.name}</div>
                {/* <div className="guide-img"> */}
                <div className="guide-souche-name">
                  {title.souche}

                  {/* <img src={guideLogo} alt="img" /> */}
                </div>
                <div className="guide-actions">
                  <label className="switch-guide">
                    <input
                      type="checkbox"
                      defaultChecked={title.is_active}
                      onChange={() => FetchGuideStatus(title.id)}
                    />
                    <span className="slider-guide"></span>
                  </label>
                  <AiFillEye
                    className="eye-icon"
                    onClick={() => {
                      dispatch(getguideId(title.id));
                      GetGuideData.GetGuideData(title.id);
                    }}
                  />
                  {/* <AiFillEdit onClick={handleOpen} className="edit-icon" /> */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ width: "100%", margin: "0 7px" }}>
          <Skeleton width={"100%"} height={50} />
        </div>
      )}
      {/* {loading && <Loader />} */}
    </div>
  );
}

export default GuideTable;
