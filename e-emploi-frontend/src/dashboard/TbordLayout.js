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
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import { ForumOutlined } from "@mui/icons-material";
import { PersonOutlined } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
const drawerWidth = 300;
const TbordLayout = ({ currentUser }) => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState("demandes");
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
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton sx={{ height:"56px", borderRadius: "10px" }} className="active:bg-gray-200"
                selected={selectedItem === 'demandes'}
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
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton sx={{ height:"56px", borderRadius: "10px" }}
              selected={selectedItem === 'propositions'}
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
            </ListItem>
            
            <ListItem
            
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton
              selected={selectedItem === "chat"}
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
                selected={selectedItem === "dashboard"}
                onClick={() => {
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
              <ListItemButton selected={selectedItem==="compte"} sx={{ height:"56px", borderRadius: "10px" }} onClick={() => {
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
