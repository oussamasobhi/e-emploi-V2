import { Box, Breadcrumbs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { getAnnonceById, getSousCategory } from "../util/APIUtils";

const DemandeLayout = () => {
  const { id } = useParams();
  const [demande, setDemande] = useState(null);
  const [sousCat, setSousCat] = useState(null);
  
  useEffect(() => {
    const loadDemande = async () => {
     try{
       const res = await getAnnonceById(id);
       setDemande(res);
     }catch(error){
       console.log(error);
     }
    }
    if(id) loadDemande();
    console.log(id);
   }, [id])
   useEffect(() => {
     console.log(demande)
   }, [demande])
   useEffect(() => {
    const loadSousCategorie = async () => {
     try{
       const res = await getSousCategory(demande.categorie1Annonce);
       setSousCat(res);
     }catch(error){
       console.log(error);
     }
    }
    console.log(demande)
    if(demande) loadSousCategorie();
   }, [demande])
     
   useEffect(() => {
    console.log(sousCat)
  }, [sousCat])
  

   
  const breadcrumbs = [
    <Link
      to="/dboard"
      className="font-wix no-underline hover:underline text-black"
    >
      Mes demandes
    </Link>,
    <Typography sx={{ fontFamily: "Wix Madefor Display", color: "gray" }}>
      {sousCat?.nom_sous_categorie}
    </Typography>,
  ];
  return (
    <Box sx={{
      flex: "1 1 auto",
      overflowY: "auto",
      paddingX: "32px",
      marginY: "32px",
    }} >
    <Box className="px-10 lg:px-8" sx={{ paddingY: "12px" }}>
      <Breadcrumbs
        className="py-2"
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Outlet />
    </Box>
    </Box>
  );
};

export default DemandeLayout;
