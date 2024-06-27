import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
// import egge90 from "./egge90";
import { useSelector } from "react-redux";

const TimeToolTip = ({ period, starts, ends }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text, setText] = React.useState("");
  const [replacedText, setReplacedText] = React.useState("");
  let refreshData = useSelector((state) => state.getSiteData.refreshData);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  useEffect(() => {
    if (text) {
      setReplacedText(
        text?.replace(":", '<span class="replaced-text">h </span>') +
          "<span class='replaced-text'>m</span>"
      );
    }
  }, [text, refreshData]);
  useEffect(() => {
    setText(period);
  }, [period]);
  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: replacedText ? replacedText : "-- : --",
          }}
        ></p>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          {starts ? starts : "-:- "}~{ends ? ends : " -:- "}
        </Typography>
      </Popover>
    </div>
  );
};

export default TimeToolTip;
