import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import isEqual from "lodash/isEqual";

import { IconButton } from "@mui/material";
import DateSelected from "./DateSelected";
import AgeSelected from "./AgeSelected";
import { AddCircle } from "@mui/icons-material";

const LotBox = ({ data, onAge, myFunction }) => {
  // console.log(data);
  // let lots = [
  //   {'lotId': 6, 'times': ["2021-10-26", "2021-10-27", "2021-10-28"]},
  //   {'lotId': 7, 'times': ["2021-10-26", "2021-10-27", "2021-10-28"]},
  //   {'lotId': 8, 'times': ["2021-10-26", "2021-10-27", "2021-10-28"]},
  // ]

  const [object, setObject] = useState({});
  const [myArray, setMyArray] = useState([]);
  const addPropertiesToObject = () => {
    setMyArray([object, ...myArray]);
  };
  useEffect(() => {
    console.log(myArray);
  }, [myArray]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div className="selected-sites-box">
        <div className="site-name">
          <p className="site-title">{data?.lotCode}</p>
        </div>
        <div className="mult-date-selected">
          <div className="selected-bats-box">
            <AgeSelected
              ages={data?.ages}
              status={onAge}
              setObject={setObject}
              lotId={data?.lotId}
            />
          </div>

          <div className="selected-date">
            <DateSelected
              dates={data?.dates}
              status={onAge}
              // getLotIdDateOrAge={getLotIdDateOrAge}
            />
          </div>
          <IconButton
            aria-label="Fermer"
            color="success"
            variant="contained"
            onClick={() => {
              console.log("add object to array");
              addPropertiesToObject();
            }}
          >
            <AddCircle />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default LotBox;
