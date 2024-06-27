import * as React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks6Icon from "@mui/icons-material/Looks6";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function SizeToggle({ seletctedValue, handleSelectedValue }) {
  return (
    <ToggleButtonGroup
      value={seletctedValue}
      exclusive
      onChange={handleSelectedValue}
      aria-label="text alignment"
    >
      <ToggleButton value={2} aria-label="left aligned">
        <LooksTwoIcon />
      </ToggleButton>
      <ToggleButton value={4} aria-label="centered">
        <Looks4Icon />
      </ToggleButton>
      <ToggleButton value={6} aria-label="right aligned">
        <Looks6Icon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
