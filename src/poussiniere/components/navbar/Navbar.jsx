import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import MenuItem from "@mui/material/MenuItem";
import logo from "../../../assets/004.png";
import { NavLink } from "react-router-dom";
import Performance from "./Performance";
import Parametrage from "./Parametrage";
import PdfDownload from "./PdfDownload";
import { Dashboard, NoteAdd, Vaccines } from "@mui/icons-material";
import AccountMenu from "../../../components/DropDowns/AccountMenu";
import fd from "../../../assets/fd-logo.png";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

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
        backgroundColor: "#ef6c00",
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
                <NavLink to="/poussiniere" className="link link-menu">
                  <Dashboard className="sidebar-icons" />
                  <span>Accueil</span>
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  to="/poussinier/saisie-donnees"
                  className="link link-menu"
                >
                  <NoteAdd className="sidebar-icons" />{" "}
                  <span>Saisie de données</span>
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  to="/poussinier/prophylaxie"
                  className="link link-menu"
                >
                  <Vaccines className="sidebar-icons" />{" "}
                  <span>Prophylaxie</span>
                </NavLink>
              </MenuItem>
              <MenuItem>
                <Performance className={"link-menu"} />
              </MenuItem>
              <MenuItem>
                <PdfDownload className={"link-menu"} />
              </MenuItem>
              <MenuItem>
                <Parametrage className={"link-menu"} />
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              height: "1.5%",
              background: "var(--dark-blue)",
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
            <NavLink to="/poussiniere" className="link ">
              <Dashboard className="sidebar-icons" />
              <span>Accueil</span>
            </NavLink>
            <NavLink to="/poussinier/saisie-donnees" className="link">
              <NoteAdd className="sidebar-icons" />{" "}
              <span>Saisie de données</span>
            </NavLink>
            <NavLink to="/poussinier/prophylaxie" className="link">
              <Vaccines className="sidebar-icons" /> <span>Prophylaxie</span>
            </NavLink>
            <Performance className={"sub-link"} />
            <PdfDownload className={"sub-link"} />
            <Parametrage className={"sub-link"} />
          </Box>

          <AccountMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
