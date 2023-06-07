import React, { useEffect, useState } from "react";
import { getCurrentUser, uploadPdp } from "../util/APIUtils";
import { Avatar, Box, Button, Modal, TextField, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import { myTheme } from "../theme";
import { useNavigate } from "react-router";

const MonCompte = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [pict, setPict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileExists, setFileExists] = useState(false);
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPict(file);
  };
  useEffect(() => {
    console.log(pict);
  }, [pict])
  
  const savePdp = async () => {
    const formData = new FormData();
    formData.append("file", pict);
    try {
      await uploadPdp(formData);
    } catch (error) {
      console.log(error);
    }
    updateUser();
  }
  
  const updateUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };
  const checkFileExists = (filePath) => {
    const request = new XMLHttpRequest();
    request.open('HEAD', filePath, false);
    request.send();
  
    return request.status === 200;
  };
  useEffect(() => {
    console.log( (user?.photo_profil && checkFileExists("../public/files/"+user?.photo_profil?.name)));
  }, [user])
  

  if (!user || user?.photo_profil && !checkFileExists("../public/files/"+user?.photo_profil?.name) ) return <Typography variant="body1">Loading...</Typography>;
  return (
    <>
    <Box className="p-6">
      <Box className="flex mb-5">
        {!user?.photo_profil && <Avatar alt="Photo de profil" sx={{ width: "80px", height: "80px", marginRight:"15px" }}>
          N
        </Avatar>}
        {(user?.photo_profil && checkFileExists("../public/files/"+user?.photo_profil?.name))&& <Avatar
          alt={user.prenom+" "+user.nom}
          src={require("../public/files/"+user?.photo_profil?.name)}
          sx={{ width: "80px", height: "80px", marginRight:"15px" }}
        />}
        
        <Box className="flex flex-col justify-center">
          <Typography variant="h4" sx={{ fontFamily: "Poppins" }}>
            {user.prenom}{" "}
          </Typography>
          <Typography variant="body2" sx={{fontFamily:'Wix Madefor Display'}}>
          {user.role === "ROLE_STANDARD" ? `Utilisateur standard` : 
                (user.role === "ROLE_ADMIN" ? `Administrateur` : "Prestataire")}
          </Typography>
          <Button onClick={()=>setIsOpenAdd(true)} >Changer photo de profil</Button>
        </Box>
      </Box>
      <Typography variant="h6" sx={{fontFamily:"Poppins", fontWeight:"bold", paddingY:"10px"}} >Gérer mon compte</Typography>
      <Box  className="grid grid-cols-2 gap-4">
        <Box onClick={() => {navigate("/dboard/moncompte/informations")}} className='flex flex-col cursor-pointer'>
          <PersonOutlineOutlinedIcon sx={{width:"32px", height:"32px", color: myTheme.palette.blue.second}} /> 
          <Typography variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold",color:myTheme.palette.blue.second}} >Informations personnelles</Typography>
          <Typography variant="body1"   sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>Complétez et mettez à jour votre identité pour faciliter les échanges avec vos prestataires.</Typography>
        </Box>
        {user?.role!=="ROLE_STANDARD" 
        && 
        <Box onClick={() => {navigate("/dboard/moncompte/competences")}} className='flex flex-col cursor-pointer'>
          <WbIncandescentOutlinedIcon sx={{width:"32px", height:"32px", color: myTheme.palette.blue.second}} /> 
          <Typography variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold",color:myTheme.palette.blue.second}} >Mes compétences</Typography>
          <Typography variant="body1"   sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>Mettre à jour vos compétences pour postuler à plus de  demande</Typography>
        </Box>}
      </Box>
    </Box>
    <Modal
        open={isOpenAdd}
        onClose={()=>setIsOpenAdd(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box  sx={{position:'absolute', top:"50%", left:'50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">Changer photo de profil</h2>
            <div>
      <TextField
        type="file"
        size="small"
        onChange={handleFileChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
            <Button onClick={()=>setIsOpenAdd(false)}>Fermer</Button>
            <Button disabled={!pict} onClick={savePdp} >Enregistrer</Button>
          </Box>
      </Modal>
    </>
  );
};

export default MonCompte;
