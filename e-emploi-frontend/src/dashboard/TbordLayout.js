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
import React from "react";
import { Outlet, useNavigate } from "react-router";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ForumOutlined } from "@mui/icons-material";
import { PersonOutlined } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
const drawerWidth = 300;
const TbordLayout = ({ logout, currentUser }) => {
  const theme = useTheme();
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
  return (
    <Box className="w-full flex">
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
          onClick={() => {
            navigate("/dboard/demandes")
          }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton sx={{ height:"56px", borderRadius: "10px" }} onClick={() => {}}>
                <ListItemIcon>
                <BookmarkBorderIcon
                    sx={{ fontSize: "30px", color: theme.palette.primary.main }}
                  />
                </ListItemIcon>
                <Typography sx={{ fontSize: "16px", color:"#5d636a", fontFamily: "Poppins" }}>
                  Demandes
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
                onClick={() => {
                  navigate("/dboard");
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
              <ListItemButton sx={{ height:"56px", borderRadius: "10px" }} onClick={() => {}}>
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
                <ListItemButton sx={{ height:"56px", borderRadius: "10px" }} onClick={() => {}}>
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
              onClick={() => {
                navigate("/dboard/moncompte")
              }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ListItemButton sx={{ height:"56px", borderRadius: "10px" }} onClick={() => {}}>
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
        className="grow"
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
          paddingX: "32px",
          marginY: "32px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default TbordLayout;
