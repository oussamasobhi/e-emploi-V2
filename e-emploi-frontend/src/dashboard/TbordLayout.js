import { useTheme } from "@emotion/react";
import {
  Box,
  Drawer,
  ListItem,
  List,
  Paper,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { ForumOutlined } from "@mui/icons-material";
import { PersonOutlined } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
const drawerWidth = 300;
const TbordLayout = ({ currentUser }) => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const goToLogin = () => {
    navigate("/login");
  };
  const goToProRegister = () => {
    navigate("/prosignup");
  };
  const goToProfile = () => {
    navigate("/" + currentUser.username);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  useEffect(() => {
    console.log(location.pathname)
  }, [location])
  

  return (
    <Box className="w-full h-full flex">
      <Drawer
        sx={{
          marginTop: "70px",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List className="" sx={{ position: "relative", top: "70px" }}>
          <Box className="">
            {JSON.parse(localStorage.getItem("CURRENT_USER")).role !=="ROLE_Pro" && <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton sx={{ height:"56px", borderRadius: "10px" }} className="active:bg-gray-200"
                selected={selectedItem === 'demandes' || location.pathname === "/dboard"}
                onClick={() => {
                  navigate("/dboard");
                  handleItemClick("demandes")
                }}
              >
                <ListItemIcon>
                  <BookmarkBorderIcon
                    sx={{ fontSize: "30px", color: theme.palette.primary.main }}
                  />
                </ListItemIcon>
                <Typography sx={{ fontSize: "16px", color:"#5d636a", fontFamily: "Poppins" }}>
                  Mes demandes
                </Typography>
              </ListItemButton>
            </ListItem>}
           {JSON.parse(localStorage.getItem("CURRENT_USER")).role === "ROLE_Pro" && <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton sx={{ height:"56px", borderRadius: "10px" }}
              selected={selectedItem === 'propositions'|| location.pathname === "/dboard/propositions"}
                onClick={() => {
                  navigate("/dboard/propositions");
                  handleItemClick('propositions');
                }}
              >
                <ListItemIcon>
                  <BookmarkRoundedIcon
                    sx={{ fontSize: "30px", color: theme.palette.primary.main }}
                  />
                </ListItemIcon>
                <Typography sx={{ fontSize: "16px", color:"#5d636a", fontFamily: "Poppins" }}>
                  Mes propositions
                </Typography>
              </ListItemButton>
            </ListItem>}
            
            <ListItem
            
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton
              selected={selectedItem === "chat" || location.pathname === "/dboard/chat"}
              onClick={() => {
                navigate("/dboard/chat");
                handleItemClick("chat")
              }}
              sx={{ height:"56px", borderRadius: "10px" }}>
                <ListItemIcon>
                  <ForumOutlined
                    sx={{ fontSize: "30px", color: theme.palette.primary.main }}
                  />
                </ListItemIcon>
                <Typography sx={{ fontSize: "16px", color:"#5d636a", fontFamily: "Poppins" }}>
                  Messagerie
                </Typography>
              </ListItemButton>
            </ListItem>

            {JSON.parse(localStorage.getItem("CURRENT_USER")).role ===
              "ROLE_ADMIN" && (
              <ListItem
                onClick={() => {}}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <ListItemButton 
                selected={selectedItem === "dashboard" || location.pathname === "/dboard/admin"}
                onClick={() => {
                  navigate("/dboard/admin");
                  handleItemClick("dashboard")
                }}
                sx={{ height:"56px", borderRadius: "10px" }} >
                  <ListItemIcon>
                    <DashboardIcon
                      sx={{
                        fontSize: "30px",
                        color: theme.palette.primary.main,
                      }}
                    />
                  </ListItemIcon>
                  <Typography sx={{ fontSize: "16px", color:"#5d636a", fontFamily: "Poppins" }}>
                    Dashboard
                  </Typography>
                </ListItemButton>
              </ListItem>
            )}
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton 
              selected={selectedItem==="compte"|| location.pathname === "/dboard/moncompte"}
               sx={{ height:"56px", borderRadius: "10px" }} onClick={() => {
                 navigate("/dboard/moncompte");
                handleItemClick("compte");
              }}>
                <ListItemIcon>
                  <PersonOutlined
                    sx={{ fontSize: "30px", color: theme.palette.primary.main }}
                  />
                </ListItemIcon>
                <Typography sx={{ fontSize: "16px", color:"#5d636a", fontFamily: "Poppins" }}>
                  Compte
                </Typography>
              </ListItemButton>
            </ListItem>
          </Box>
        </List>
      </Drawer>
      <Box
        className="grow h-full "
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default TbordLayout;
