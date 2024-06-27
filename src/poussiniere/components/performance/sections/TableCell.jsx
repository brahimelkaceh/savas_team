// TableCell.js

import React from "react";
import CustomizedTooltips from "../components/TimeToolTip";
import NormeToolTip from "../components/NormeToolTip";

const TableCell = ({ value, isWeek }) => {
  if (typeof value === "object") {
    if (value?.period) {
      return (
        <td>
          <CustomizedTooltips
            period={value?.period}
            starts={value?.starts_at}
            ends={value?.ends_at}
          />
        </td>
      );
    } else if (value?.reel) {
      return (
        <td>
          <NormeToolTip
            reel={value?.reel}
            ecart={value?.ecart}
            guide={value?.guide}
            color={value?.color}
          />
        </td>
      );
    } else {
      return value ? (
        <td>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "rgb(82, 114, 242)",
            }}
          >
            {value?.min}°
          </span>
          /
          <span
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "rgb(199, 0, 57)",
            }}
          >
            {value?.max}°
          </span>
        </td>
      ) : (
        <td>--</td>
      );
    }
  } else if (typeof value === "string") {
    return <td>{value ? value?.replaceAll("|", ";") : "--"}</td>;
  } else {
    return <td>{value ? value : "--"}</td>;
  }
};

export default TableCell;
