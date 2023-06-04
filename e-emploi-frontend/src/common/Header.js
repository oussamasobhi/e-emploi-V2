import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import logo from "../public/image/logo_itako_bsc.jpg";
import DrawerComp from "./DrawerComp";
import { Link, useNavigate } from "react-router-dom";
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ForumOutlined, PersonOutlined } from "@mui/icons-material";
import DashboardIcon from '@mui/icons-material/Dashboard';

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
const Header = ({ logout, currentUser, demander }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  //console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  //console.log(isMatch);
  const goToLogin = () => {
    navigate("/login");
  };
  const goToProRegister = () => {
    navigate("/prosignup");
  }
  const goToProfile = () => {
    navigate("/dboard/moncompte");
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
      <AppBar sx={{ backgroundColor: "#063970", position:"fixed", zIndex:(theme) => theme.zIndex.drawer+1 }}>
        <Toolbar sx={{height:"70px"}} >
          <Link to={"/"}>
            <img src={logo} alt="logo_itako" className="h-14 w-14" />
          </Link>

          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.5rem", marginLeft: "5%" }}>
                E-EMPLOI
              </Typography>
              {(localStorage.getItem("token") !== "" && JSON.parse(localStorage.getItem("CURRENT_USER")).role !== "ROLE_Pro" ) && (
                <Button
                onClick={()=>demander()}
                size="large"  
                  variant="contained"
                  sx={{
                    marginLeft: "auto",
                    backgroundColor: "#F3580C",
                    borderRadius: "20px",
                    ":hover": { backgroundColor: "#C2410C" },
                    textTransform:"capitalize"
                  }}
                >
                    Demander un service
                </Button>
              )}
              <DrawerComp
                currentUser={currentUser}
                logout={logout}
                goToLogin={goToLogin}
                goToProfile={goToProfile}
              />
            </>
          ) : (
            <>
              {(localStorage.getItem("token") !== "" && JSON.parse(localStorage.getItem("CURRENT_USER")).role !== "ROLE_Pro" ) && (
                <Button
                size="large"  
                onClick={()=>demander()}
                variant="contained"
                  sx={{
                    marginLeft: "auto",
                    backgroundColor: "#f3580c",
                    borderRadius: "20px",
                    ":hover": { backgroundColor: "#C2410C" },
                    textTransform:"capitalize"
                  }}
                >
                  
                    Demander un service
                  
                </Button>
              )}
              {localStorage.getItem("token") === "" ? (
                <Box sx={{display:"flex", justifyContent:"end", marginLeft:"auto"}} >
                <Button
                  onClick={() => goToProRegister()}
                  sx={{ height:"50px", marginLeft: "auto", color: "white", backgroundColor:theme.palette.secondary.main, borderRadius:"20px", display:"flex", justifyContent:"space-between",
                  ":hover": { backgroundColor: "#C2410C" } }}
                  className="w-fit"
                >
                  <Typography sx={{ marginLeft: "6px", fontSize: "1.2rem", lineHeight: "1.6rem" }} className="capitalize font-poppins">
                    Devenir Pro
                  </Typography>
                </Button>
                <Button
                  onClick={() => goToLogin()}
                  sx={{ height:"50px", marginLeft: "16px", color: "white", borderRadius:"20px", display:"flex", justifyContent:"space-between" }}
                  className="w-fit"
                >
                  <AccountCircleIcon sx={{fontSize:30}} />
                  <Typography sx={{ marginLeft: "6px", fontSize: "1.2rem", lineHeight: "1.6rem" }} className="capitalize font-poppins">
                    Connexion
                  </Typography>
                </Button>
                </Box>
              ) : (
                <>
                  <Button
                    variant="text"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ height:"50px", marginLeft: "auto", color: "white", borderRadius:"20px", display:"flex", justifyContent:"space-between" }}
                  className="w-fit"
                  >
                   <AccountCircleIcon sx={{fontSize:30}} />
                  <Typography sx={{ marginLeft: "6px", fontSize: "1.2rem", lineHeight: "1.6rem" }} className="capitalize font-poppins">
                    {currentUser.prenom}
                  </Typography>
                  </Button>
                  
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{borderRadius:"20px"}}
                  >
                    <Box sx={{borderBottom:"2px", borderColor:theme.palette.gris.main}}  >
                    {JSON.parse(localStorage.getItem("CURRENT_USER")).role ===
                      "ROLE_ADMIN" && (
                        <MenuItem
                        onClick={() => {
                          navigate("/dboard/admin")
                           handleClose(); 
                          }}
                      sx={{display:"flex", justifyContent:"space-between", width:"320px",height:"56px"}}
                    >
                        <div className="flex">
                          <DashboardIcon sx={{fontSize:"30px", color: theme.palette.primary.main}} />
                        <Typography sx={{marginLeft:"10px", fontSize:"20px"}} >Dashboard</Typography>
                        </div>
                        <Typography className="justify-self-end text-gray-400">{/*Some Text*/}</Typography>
                      </MenuItem>
                    )}
                    {JSON.parse(localStorage.getItem("CURRENT_USER")).role !=="ROLE_Pro" && <MenuItem
                      onClick={() => {
                        navigate("/dboard")
                         handleClose(); 
                        }}
                      sx={{display:"flex", justifyContent:"space-between  ", width:"320px",height:"56px"}}
                    >
                      <div className="flex">
                        <BookmarkBorderIcon sx={{fontSize:"30px", color: theme.palette.primary.main}} />
                      <Typography sx={{marginLeft:"10px", fontSize:"20px"}} >Mes demandes</Typography>
                      </div>
                      <Typography className="justify-self-end text-gray-400">{/**Some text */}</Typography>
                    </MenuItem>}
                    </Box>
                    <Box sx={{borderBottom:"2px", borderColor:theme.palette.gris.main}}  >
                    {JSON.parse(localStorage.getItem("CURRENT_USER")).role !=="ROLE_STANDARD" && <MenuItem
                      onClick={() => {
                        navigate("/dboard/propositions")
                         handleClose(); 
                        }}
                      sx={{display:"flex", justifyContent:"space-between  ", width:"320px",height:"56px"}}
                    >
                      <div className="flex">
                        <BookmarkRoundedIcon sx={{fontSize:"30px", color: theme.palette.primary.main}} />
                      <Typography sx={{marginLeft:"10px", fontSize:"20px"}} >Mes propositions</Typography>
                      </div>
                      <Typography className="justify-self-end text-gray-400">{/**Some text */}</Typography>
                    </MenuItem>}
                    <MenuItem
                      onClick={() => {
                        navigate("/dboard/chat")
                         handleClose(); 
                        }}
                      sx={{display:"flex", justifyContent:"space-between", width:"320px",height:"56px"}}
                    >
                      <div className="flex">
                        <ForumOutlined sx={{fontSize:"30px", color: theme.palette.primary.main}} />
                      <Typography sx={{marginLeft:"10px", fontSize:"20px"}} >Messagerie</Typography>
                      </div>
                      <Typography className="justify-self-end text-gray-400">{/**Some text */}</Typography>
                    </MenuItem>
                    
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        goToProfile();
                      }}
                      sx={{display:"flex", justifyContent:"space-between", width:"320px",height:"56px"}}
                    >
                      <div className="flex">
                        <PersonOutlined sx={{fontSize:"30px", color: theme.palette.primary.main}} />
                      <Typography sx={{marginLeft:"10px", fontSize:"20px"}} >Compte</Typography>
                      </div>
                    </MenuItem>
                    </Box>
                    <MenuItem
                      onClick={(e) => {
                        handleClose();
                        logout(e, goToLogin);
                      }}
                      sx={{display:"flex", justifyContent:"space-between", width:"320px",height:"56px"}}
                    >
                      <Typography sx={{marginLeft:"10px", fontSize:"20px"}} > Déconnexion</Typography>                     
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
