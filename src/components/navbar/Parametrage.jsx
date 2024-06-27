import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TableChartIcon from "@mui/icons-material/TableChart";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
const Parametrage = ({ className }) => {
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
        <SettingsIcon></SettingsIcon> Paramétrage
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
          <NavLink className="child-link " to="/lots">
            <WorkspacesIcon className="sidebar-ico" />
            <span>gestion de Lots</span>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink className="child-link " to="/souches">
            <LibraryBooksIcon className="sidebar-ico" />
            <span>gestion de Guides</span>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink className="child-link " to="/sites">
            <ViewColumnIcon className="sidebar-ico" />
            <span>gestion de sites</span>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink className="child-link " to="/bâtiments">
            <HomeIcon className="sidebar-ico" />
            <span>gestion de bâtiments</span>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink className="child-link " to="/utilisateurs">
            <ManageAccountsIcon className="sidebar-ico" />
            <span>gestion de utilisateurs</span>
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Parametrage;
