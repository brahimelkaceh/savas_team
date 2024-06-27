import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TableChartIcon from "@mui/icons-material/TableChart";

import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Comparatif = ({ className }) => {
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
        <QueryStatsIcon></QueryStatsIcon> Comparatif
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
          <NavLink className="child-link " to="/comparatif">
            <WorkspacesIcon className="sidebar-ico" />
            <span>Comparatif/Lots</span>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink className="child-link " to="/comparatif/paramétre">
            <WorkspacesIcon className="sidebar-ico" />
            <span>Comparatif/Paramétre</span>
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Comparatif;
