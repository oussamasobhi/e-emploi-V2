import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import logo from "../public/image/logo_itako_bsc.jpg";
import DrawerComp from "./DrawerComp";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const PAGES = [
  {
    label: "Domicile",
    url: "/domicile",
  },
  {
    label: "Emplois et Services",
    url: "/emp_serv",
  },
  {
    label: "Produits",
    url: "/produit",
  },
  {
    label: "FAQ",
    url: "#",
  },
];
const Header = ({ logout, currentUser  }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  //console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  //console.log(isMatch);
  const goToLogin = () => {
    navigate("/login");
  };
  const goToProfile = () => {
    navigate("/"+currentUser.username);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <AppBar sx={{ backgroundColor: "#063970" }}>
        <Toolbar>
          <Link to={"/"}>
            <img src={logo} alt="logo_itako" className="h-14 w-14" />
          </Link>

          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.5rem", marginLeft: "5%" }}>
                E-EMPLOI
              </Typography>
              {localStorage.getItem("token") !== "" && (
                <Button variant="contained" sx={{ marginLeft: "auto", backgroundColor:"#F3580C", ":hover":{backgroundColor:"#C2410C"}}}  >
                  <Link
                    to="/annonce/create"
                    className="no-underline text-white"
                  >
                    Déposer une annonce
                  </Link>
                </Button>
              )}
              <DrawerComp currentUser={currentUser} logout={logout} goToLogin={goToLogin} goToProfile={goToProfile} />
            </>
          ) : (
            <>
              {localStorage.getItem("token") !== "" && (
                <Button variant="contained" sx={{ marginLeft: "auto", backgroundColor:"#f3580c", ":hover":{backgroundColor:"#C2410C"} }} >
                  <Link
                    to="/annonce/create"
                    className="no-underline text-white"
                  >
                    Déposer une annonce
                  </Link>
                </Button>
              )}
              <Tabs
                sx={{ marginLeft: "auto" }}
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="secondary"
              >
                {PAGES.map((page, index) => (
                  <Tab
                    key={index}
                    label={page.label}
                    LinkComponent={Link}
                    to={page.url}
                  />
                ))}
              </Tabs>

              {localStorage.getItem("token") === "" ? (
                <Button onClick={()=>goToLogin()} variant="text"   sx={{ marginLeft: "auto", color: "inherit" }} className="flex justify-between">
                    <AccountCircleIcon/>
                    <Typography sx={{marginLeft:"6px"}} className="capitalize">Connexion</Typography>
                </Button>
              ) : (
                <>
                  <Button
                    variant="text"
                    sx={{ marginLeft: "auto", color: "inherit" }}
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="flex justify-between"
                  >
                    <AccountCircleIcon/>
                    <Typography sx={{marginLeft:"6px"}} className="capitalize">{currentUser.prenom}</Typography>
                    
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={()=>{
                        handleClose();
                        goToProfile();
                        }}>Mon profil</MenuItem>
                    <MenuItem onClick={handleClose}>Menu 1</MenuItem>
                    {JSON.parse(localStorage.getItem("CURRENT_USER")).role==="ROLE_ADMIN" && <MenuItem onClick={()=>navigate("/dashboard")} >Dashboard</MenuItem>}
                    <MenuItem
                      onClick={(e) => {
                        handleClose();
                        logout(e, goToLogin);
                      }}
                    >
                      Déconnexion
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
