import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { createAnnonce } from "../util/APIUtils";
import { message } from "antd";

const PosterLayout = ({ souscategorie, titre, prevUrl, annonce }) => {
  const navigate = useNavigate();
  const [lastElt, setLastElt] = useState("");

  const path = window.location.pathname;

  useEffect(() => {
    const pathElements = path.split("/");
    setLastElt(pathElements[pathElements.length - 1]);
  }, [path]);

  useEffect(() => {
    console.log(lastElt);
  }, [lastElt]);

  const next = () => {
    if (lastElt === "duree") {
      navigate("/postjob/" + souscategorie.id + "/date");
    }
    if (lastElt === "date") {
      navigate("/postjob/" + souscategorie.id + "/lieu");
    }
    if(lastElt === "lieu"){
        navigate("/postjob/"+souscategorie.id+"/details")
    }
    if(lastElt === "details"){
        deposerAnnonce();        
        localStorage.setItem("hasCreated", JSON.stringify(true));
    }
  };
  const prev = () => {
    if (lastElt === "duree") {
      navigate(prevUrl);
    }
    if (lastElt === "date") {
      navigate("/postjob/" + souscategorie.id + "/duree");
    }
    if (lastElt === "lieu") {
      navigate("/postjob/" + souscategorie.id + "/date");
    }
    if(lastElt === "details"){
        navigate("/postjob/" + souscategorie.id + "/lieu");
    }
  };
  const deposerAnnonce = async () => {
    console.log(annonce);
    try{
        const res = await createAnnonce(annonce);
        console.log(res);
        message.success({
            content:"Annonce créée",
            className:"relative top-16"
        });
        navigate("/mesdemandes");
        localStorage.removeItem("cat1");
        
    }catch(error){
        console.log(error);
    }
  }

  return !souscategorie ? (
    <Typography>Loading...</Typography>
  ) : (
    <Box className="flex flex-col h-myHeight items-center justify-between">
      <Box sx={{ width: "528px" }} className="mt-20">
        <Typography
          variant="body1"
          sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
          className="Capitalize"
          gutterBottom
        >
          {souscategorie.nom_sous_categorie}
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
          className="Capitalize"
        >
          {titre}
        </Typography>
        <Box className="mt-12">
          <Outlet/>
        </Box>
      </Box>
      <Box
        sx={{ width: "100%", paddingY: "8px", borderTop: "1px" }}
        className="flex justify-around"
      >
        <Button
          onClick={prev}
          variant="text"
          sx={{ textTransform: "capitalize" }}
          size="large"
        >
          <Typography fontFamily="Poppins" variant="subtitle1">
            Retour
          </Typography>
        </Button>
        <Button
          onClick={next}
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          size="large"
        >
          <Typography fontFamily="Poppins" variant="subtitle1">
           Continuer
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default PosterLayout;
