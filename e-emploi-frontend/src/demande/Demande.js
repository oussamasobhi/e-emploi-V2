import {  Avatar, Box, Button, Divider, Fade, Modal, Popper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { myTheme } from '../theme';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import { useTheme } from '@emotion/react';
import { useParams } from 'react-router';
import { getAnnonceById, getSousCategory, terminerAnnonce } from '../util/APIUtils';
import Offre from './Offre';
import ModifierDemande from './ModifierDemande';
import { message } from 'antd';
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const Demande = () => {
  const {id} = useParams();
  const [demande, setDemande] = useState(null);
  const [sousCat, setSousCat] = useState(null);
  const [isOpenModifier, setIsOpenModifier] = useState(false);
  const [isOpenCloturer, setIsOpenCloturer] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id2 = canBeOpen ? 'transition-popper' : undefined;

  const theme = useTheme()
 
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
  }, [id])
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

  const cloturer = async () => {
    try{
      const res = await terminerAnnonce(demande.id);
      console.log(res);
      message.info({
        content:"Vous avez cloturé cette annonce",
        className: "relative top-16"
      })
    }catch(error){
      console.log(error)
    }
    loadDemande();
    setIsOpenCloturer(false);
  }
  const loadDemande = async () => {
    try{
      const res = await getAnnonceById(demande.id);
      setDemande(res);
    }catch(error){
      console.log(error);
    }
   }
  
  
  if(!sousCat || !demande){
    return <Typography variant='body1' >Loading...</Typography>
}
  
  return (
    <>
    <Box className='flex flex-col lg:flex-row bg-white' sx={{ marginTop:"16px",}} >
      <Box className="grow px-0 lg:pr-24">
        <Box sx={{ height:"200px", marginBottom:"24px" }} className="bg-purple-500 rounded-xl flex justify-center items-center overflow-hidden">
          <img src={require("../public/image_sc/sc"+demande.categorie1Annonce+".jpg")} className="h-full w-full object-cover" />
        </Box>
        <Box className="flex justify-between" >
          <Typography variant="h6" sx={{fontFamily:"Poppins", fontWeight:"bold", textTransform:"lowercase"}} >{sousCat.nom_sous_categorie} </Typography>
          <Box className="flex gap-3">
          <div>
          <Button variant="text" className='mr-4' aria-describedby={id} type="button" onClick={handleClick} >
            <ModeStandbyIcon className='text-green-600' sx={{ marginRight:"6px"}} />
            <span className='font-poppins text-green-600 text-xl capitalize text-bold' >{demande?.statusAnnonce} </span>
          </Button>
          <Popper id={id2} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Button variant='outlined' onClick={()=>{setIsOpenCloturer(true); setOpen(false)}} sx={{color:"red" }}>
              Clôturer l'annonce
            </Button>
          </Fade>
        )}
      </Popper>
          </div>
          <Button variant="outlined"  sx={{backgroundColor:"#E6F6FF", borderRadius:"10px", "&:hover":{
            backgroundColor:"#BFEBFF"
          }}} onClick={()=>setIsOpenModifier(true)} >
            <TuneRoundedIcon sx={{color:myTheme.palette.blue.main, marginRight:"6px"}} />
            <span className='font-poppins  text-blue-700 capitalize text-bold' >Modifier</span>
          </Button>
          </Box>
        </Box>
        <Typography variant='body2' sx={{fontFamily:"Wix Madefor Display", marginBottom:"18px"}}><span className='text-gray-800'>Pour {formatter.format(new Date(demande.date))} ({demande.duree}) </span></Typography>
        <Box className="flex mb-6">
          <Box className="flex items-center mr-6">
            <Box className="bg-blue-200 rounded-full flex justify-center items-center mr-2" sx={{padding:"6px"}} >
              <LocationOnRoundedIcon sx={{color:myTheme.palette.blue.second}} />
            </Box>
            <Typography variant='body1' sx={{fontFamily:"Poppins"}}>
              {demande.adresse.suplementaire!=="" && <span className='text-gray-800 '>{demande.adresse.suplementaire},&nbsp; </span>}
              {demande.adresse.quartier!=="" && <span className='text-gray-800 '>{demande.adresse.quartier},&nbsp; </span>}
              {demande.adresse.ville!=="" && <span className='text-gray-800 '>{demande.adresse.ville} </span>}
              </Typography>
          </Box>
        </Box>
        <Box className="mb-5">
          <Typography variant="subtitle1" gutterBottom><span className='font-bold font-poppins'>Détails de la demande</span></Typography>
          <Typography variant="body2" sx={{fontFamily:"Wix Madefor Display", marginBottom:"18px"}}>{demande.infos_complementaire} </Typography>
          <Typography variant="subtitle1" gutterBottom><span className='font-bold font-poppins'>Données personnelles</span></Typography>
          <Box className="grid grid-cols-2">
          <Box className="flex items-start">
          <LocalPhoneOutlinedIcon sx={{color:myTheme.palette.blue.second, marginRight:"12px"}} />
          <Box className="flex flex-col">
            <Typography variant="body1" sx={{fontFamily:"Wix Madefor Display"}}>Numéro téléphone</Typography>
            <Typography variant="body1" sx={{fontFamily:"Wix Madefor Display", fontWeight:"bold"}}>{demande.userResponse.num_tel} </Typography>
          </Box>
          </Box>
          
          </Box>
          
        </Box>
       
      </Box>
      <Box className='lg:hidden' >
      <Divider  />
      </Box>
      
      {/* Profils trouvés */}
      <Box>
      <Box className="lg:w-373 lg:mt-0 mt-10 " >
        <Typography variant='h6' sx={{fontFamily:"Poppins", fontWeight:"bold"}} gutterBottom>Offres reçues</Typography>
        {demande?.annonceUsers?.map((pro, index)=>(
          pro?.id?.iduser!== JSON.parse(localStorage.getItem("CURRENT_USER")).id && 
          <Offre key={index} postulation={pro} demande={demande} setDemande={setDemande} />
        
        ))}
      </Box>
      </Box>
    </Box>
    <Modal
    open={isOpenModifier}
    onClose={()=>setIsOpenModifier(false)}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <Box className="" sx={{fontFamily:"Poppins"}}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
      <h2 id="modal-title">Modifier votre demande</h2>
      <ModifierDemande demande={demande} setDemande={setDemande} setIsOpenModifier={setIsOpenModifier}/>

    </Box>
    </Box>
  </Modal>
  <Modal
  open={isOpenCloturer}
  onClose={()=>setIsOpenCloturer(false)} aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
<Box className="" sx={{fontFamily:"Poppins"}}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
      <h2 id="modal-title">Clôturer votre demande</h2>
      <Typography sx={{fontFamily:"Wix Madefor Display"}} >Voulez vous clôturer cette annonce?</Typography>
      <Box className="flex mt-6 justify-end gap-3">
        <Button variant='text' onClick={()=>setIsOpenCloturer(false)} >Fermer</Button>
        <Button variant='contained' onClick={cloturer} >Confirmer</Button>
      </Box>
    </Box>
    </Box>
</Modal>

    </>
  )
}

export default Demande;