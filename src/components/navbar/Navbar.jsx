import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "./style.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Performance from "./Performance";
import Parametrage from "./Parametrage";
import PdfDownload from "./PdfDownload";
import logo from "../../assets/004.png";
import fd from "../../assets/fd-logo.png";
import DropMenu from "../DropDowns/DropMenu";
import Comparatif from "./Comparatif";
import AccountMenu from "../DropDowns/AccountMenu";
import { Dashboard, NoteAdd } from "@mui/icons-material";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        background: "#0085ff",
      }}
    >
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "1.5%",
              height: "1.5%",
              padding: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              borderRadius: 1,
              backgroundColor: "var(--dark-blue)",
            }}
          >
            <img src={fd} alt="Savas-logo" className="logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              className="nav-links"
            >
              <MenuItem>
                <NavLink to="/" className="link link-menu">
                  <Dashboard className="sidebar-icons" />
                  <span>Accueil</span>
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/report" className="link link-menu">
                  <NoteAdd className="sidebar-icons" />{" "}
                  <span>Saisie de données</span>
                </NavLink>
              </MenuItem>

              <MenuItem>
                <Performance className={"link-menu"} />
              </MenuItem>
              <MenuItem>
                <PdfDownload className={"link-menu"} />
              </MenuItem>
              <MenuItem>
                <Comparatif className={"link-menu"} />
              </MenuItem>
              <MenuItem>
                <Parametrage className={"link-menu"} />
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              height: "1.5%",
              display: { xs: "flex", md: "none" },
              width: { xs: "3vw", md: "5vw" },
              alignItems: "center",
              borderRadius: 2,
              padding: 1,
            }}
          >
            <img src={fd} alt="Savas-logo" className="logo" />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", gap: 12, alignItems: "end" },
              mx: 2,
            }}
            className="nav-links"
          >
            <NavLink to="/" className="link ">
              <Dashboard className="sidebar-icons" />
              <span>Accueil</span>
            </NavLink>
            <NavLink to="/report" className="link">
              <NoteAdd className="sidebar-icons" />{" "}
              <span>Saisie de données</span>
            </NavLink>

            <Performance className={"sub-link"} />
            <PdfDownload className={"sub-link"} />
            <Comparatif className={"sub-link"} />
            <Parametrage className={"sub-link"} />
          </Box>
          <AccountMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

{
  /* <div className="nav-links">
<div
  style={{
    "width": "120px",
    "height": "6vh",
    "background": "#fff",
    "display": "flex",
    "alignItems": "center",
  }}
>
  <img src={logo} alt="Savas-logo" className="logo" />
</div>
<NavLink to="/" className="link">
  <DashboardIcon className="sidebar-icons" />
  <span>Accueil</span>
</NavLink>
<NavLink to="/report" className="link">
  <NoteAddIcon className="sidebar-icons" />{" "}
  <span>Saisie de données</span>
</NavLink>
<Performance />
<PdfDownload />
<Comparatif />
<Parametrage />
</div>
<AccountMenu /> */
}
