import React from "react";
import MouseOverPopover from "../../../components/popper/MouseOverPopover";
function DailyDataTd({ lot_id, data, secondaryData, className }) {
  // console.log(secondaryData);
  return (
    <td className={className} rowSpan={2}>
      {lot_id ? (
        <div>
          <div>
            <MouseOverPopover
              guide={data?.guide ? data?.guide : "--"}
              reel={data?.reel ? data?.reel : "--"}
              fontSize={15}
            />
          </div>
          <div className={lot_id ? data?.color : ""}>
            <MouseOverPopover
              guide={data?.guide ? data?.guide : "--"}
              reel={data?.ecart ? data?.ecart : "--"}
              fontSize={15}
            />
          </div>
        </div>
      ) : data ? (
        data
      ) : (
        secondaryData
      )}
    </td>
  );
}

export default DailyDataTd;
