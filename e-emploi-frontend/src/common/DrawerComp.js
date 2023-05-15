import React, { Fragment, useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";

let PAGES = [
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
    url: "#",
  },
  {
    label: "FAQ",
    url: "#",
  },
];

const DrawerComp = ({ currentUser, logout, goToLogin, goToProfile }) => {
  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") === "")
      PAGES.push({
        label: "Connexion",
        url: "/login",
      });
  }, [localStorage.getItem("token")]);

  return (
    <Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        {localStorage.getItem("token") !== "" && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
            >
              <Typography>{currentUser.prenom} </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItemButton
                  onClick={(e) => {
                    setOpenDrawer(false);
                    goToProfile();
                  }}
                >
                  <ListItemIcon>
                    <ListItemText>Profil</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
                {JSON.parse(localStorage.getItem("CURRENT_USER")).role ===
                  "ROLE_ADMIN" && (
                  <ListItemButton onClick={(e) => navigate("/dashboard")}>
                    <ListItemIcon>
                      <ListItemText>Dashboard</ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                )}
                <ListItemButton
                  onClick={(e) => {
                    setOpenDrawer(false);
                    logout(e, goToLogin);
                  }}
                >
                  <ListItemIcon>
                    <ListItemText>Déconnexion</ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </List>
            </AccordionDetails>
          </Accordion>
        )}
        {/*<List>
          {PAGES.map((page, index) => (
            <ListItemButton
              key={index}
              onClick={() => setOpenDrawer(false)}
              LinkComponent={Link}
              to={page.url}
            >
              <ListItemIcon>
                <ListItemText>{page.label}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          </List>*/}
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ color: "white", marginLeft: "auto" }}
      >
        <MenuOutlinedIcon />
      </IconButton>
    </Fragment>
  );
};

export default DrawerComp;
