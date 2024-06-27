import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TableChartIcon from "@mui/icons-material/TableChart";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Performance = ({ className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <a
        className={className}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PublishedWithChangesIcon></PublishedWithChangesIcon> Performances
        <ExpandMoreIcon></ExpandMoreIcon>
      </a>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink className="child-link" to="/charts" color="#333">
            <QueryStatsIcon className="sidebar-ico" />
            <span>Performances en courbes</span>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink className="child-link" to="/modification">
            <TableChartIcon className="sidebar-ico" />
            <span>Performances en chiffres</span>
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Performance;
