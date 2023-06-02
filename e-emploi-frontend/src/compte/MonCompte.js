import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../util/APIUtils";
import { Avatar, Box, Button, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import { myTheme } from "../theme";
import { useNavigate } from "react-router";

const MonCompte = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadUser();
  }, []);


  if (!user) return <Typography variant="body1">Loading...</Typography>;
  return (
    <Box className="p-6">
      <Box className="flex mb-5">
        <Avatar alt="Photo de profil" sx={{ width: "80px", height: "80px", marginRight:"15px" }}>
          N
        </Avatar>
        <Box className="flex flex-col justify-center">
          <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
            {user.prenom}{" "}
          </Typography>
          <Typography variant="body2" >Some text </Typography>
        </Box>
      </Box>
      <Box className="p-[16px] h-[93px] bg-blue-100 rounded-xl flex flex-col mb-6" >
        <Typography variant="subtitle1"  sx={{fontFamily:"Poppins"}}>Statut</Typography>
        <Typography variant="body2"  sx={{fontFamily:"Wix Madefor Display", color:"gray"}} gutterBottom>Some text</Typography>
        <Box>
        <Button variant="contained" sx={{backgroundColor:myTheme.palette.purple.main, color:"white", borderRadius:"16px", 
        ":hover":{backgroundColor:myTheme.palette.purple.second}
      }}>
          <span className="capitalize font-poppins">Découvrir</span>
        </Button>
        </Box>
      </Box>
      <Typography variant="h6" sx={{fontFamily:"Poppins", fontWeight:"bold", paddingY:"10px"}} >Gérer mon compte</Typography>
      <Box  className="grid grid-cols-2 gap-4">
        <Box onClick={() => {navigate("/dboard/moncompte/informations")}} className='flex flex-col cursor-pointer'>
          <PersonOutlineOutlinedIcon sx={{width:"32px", height:"32px", color: myTheme.palette.blue.second}} /> 
          <Typography variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold",color:myTheme.palette.blue.second}} >Informations personnelles</Typography>
          <Typography variant="body1"   sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>Complétez et mettez à jour votre identité pour faciliter les échanges avec vos prestataires.</Typography>
        </Box>
        {user?.role==="ROLE_Pro" 
        && 
        <Box onClick={() => {console.log("compétence clicked")}} className='flex flex-col cursor-pointer'>
          <WbIncandescentOutlinedIcon sx={{width:"32px", height:"32px", color: myTheme.palette.blue.second}} /> 
          <Typography variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold",color:myTheme.palette.blue.second}} >Mes compétences</Typography>
          <Typography variant="body1"   sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>Mettre à jour vos compétences pour postuler à plus de  demande</Typography>
        </Box>}
      </Box>
    </Box>
  );
};

export default MonCompte;
