import {  Avatar, Box, Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { myTheme } from '../theme';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@emotion/react';
import { useParams } from 'react-router';
import { getAnnonceById, getSousCategory } from '../util/APIUtils';
import Offre from './Offre';
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const Demande = () => {
  const {id} = useParams();
  const [demande, SetDemande] = useState(null);
  const [sousCat, setSousCat] = useState(null);
  const x = [1,2,3,4,5]
  const theme = useTheme()
 
  useEffect(() => {
   const loadDemande = async () => {
    try{
      const res = await getAnnonceById(id);
      SetDemande(res);
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
  
  
  if(!sousCat || !demande){
    return <Typography variant='body1' >Loading...</Typography>
}
  
  return (
    <Box className='flex flex-col lg:flex-row' sx={{ marginTop:"16px",}} >
      <Box className="grow px-0 lg:pr-24">
        <Box sx={{ height:"185px", marginBottom:"24px" }} className="bg-purple-500 rounded-xl flex justify-center items-center ">
    photo
        </Box>
        <Box className="flex justify-between" >
          <Typography variant="h5" sx={{fontFamily:"Poppins", fontWeight:"bold"}} >{sousCat.nom_sous_categorie} </Typography>
          <Box className="flex gap-3">
          <Button variant="outlined"  sx={{backgroundColor:"#E6F6FF", borderRadius:"10px", "&:hover":{
            backgroundColor:"#BFEBFF"
          }}} >
            <TuneRoundedIcon sx={{color:myTheme.palette.blue.main, marginRight:"6px"}} />
            <span className='font-poppins  text-blue-700 capitalize text-bold' >{demande?.statusAnnonce} </span>
          </Button>
          <Button variant="outlined"  sx={{backgroundColor:"#E6F6FF", borderRadius:"10px", "&:hover":{
            backgroundColor:"#BFEBFF"
          }}} >
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
          <Box className="flex items-start">
          <LocationOnOutlinedIcon sx={{color:myTheme.palette.blue.second, marginRight:"12px"}} />
         <Box className="flex flex-col">
            <Typography variant="body1" sx={{fontFamily:"Wix Madefor Display"}}>Adresse</Typography>
            {demande.userResponse.adresse && <Typography variant="body1" sx={{fontFamily:"Wix Madefor Display", fontWeight:"bold"}}>
            {demande.userResponse.adresse?.suplementaire!=="" && <span className='text-gray-800 '>{demande.userResponse.adresse?.suplementaire},&nbsp; </span>}
              {demande.userResponse.adresse?.quartier!=="" && <span className='text-gray-800 '>{demande.userResponse.adresse?.quartier},&nbsp; </span>}
              {demande.userResponse.adresse?.ville!=="" && <span className='text-gray-800 '>{demande.userResponse.adresse?.ville} </span>}
            </Typography>}
            
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
          <Offre key={index} postulation={pro} />
        
        ))}
      </Box>
      </Box>
    </Box>
  )
}

export default Demande;