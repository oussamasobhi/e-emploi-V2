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
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const Demande = () => {
  const {id} = useParams();
  const [demande, SetDemande] = useState(null);
  const [sousCat, setSousCat] = useState(null);
  const x = [1,2,3,4,5]
  const theme = useTheme()
  useEffect(() => {
    console.log(theme)
  }, [theme])
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
          <Button variant="outlined"  sx={{backgroundColor:"#E6F6FF", borderRadius:"10px", "&:hover":{
            backgroundColor:"#BFEBFF"
          }}} >
            <TuneRoundedIcon sx={{color:myTheme.palette.blue.main, marginRight:"6px"}} />
            <span className='font-poppins  text-blue-700 capitalize text-bold' >Modifier</span></Button>
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
          {/*<Box className="flex items-center mr-6">
            <Box className="bg-blue-200 rounded-full flex justify-center items-center mr-2" sx={{padding:"6px"}} >
              <LocationOnRoundedIcon sx={{color:myTheme.palette.blue.second}} />
            </Box>
            <Typography variant='body1' sx={{fontFamily:"Poppins"}}><span className='text-gray-800 '>Adresse</span></Typography>
          </Box>*/}
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
      <Box className="lg:w-373 lg:mt-0 mt-10 " >
        <Typography variant='h6' sx={{fontFamily:"Poppins", fontWeight:"bold"}} gutterBottom>Offres reçues</Typography>
      <Box className='p-6 rounded-md border-1 lg:grid-cols-2 mb-4 max-w-620 flex justify-center' sx={{border:1, borderColor:"#cccccc"}}>
        <Box className="lg:mr-2" sx={{width: '96px', // Equivalent to w-24 in Tailwind CSS
    [theme.breakpoints.up('lg')]: {
      width: '80px', // Equivalent to lg:w-16 in Tailwind CSS
      height: '80px'
    },}}>
        <Avatar
        alt="Photo de profil"        
        sx={{width:"80px", height:"80px"}}
      >N</Avatar>
        </Box>
        <Box className='grow'>
          <Box className='flex justify-between mb-2' >
          <Typography variant="h5" sx={{fontFamily:"Poppins", fontWeight:"bold"}} >Marion</Typography>
          <Typography variant="h5" sx={{fontFamily:"Poppins", fontWeight:"bold"}} >300£</Typography>
          </Box>
          <Box className="flex gap-2 items-center">
          <StarIcon sx={{color:'#ffb942'}}  />
          <Typography variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold"}}>5,0</Typography>
          <Typography variant="subtitle1" sx={{}}><span className='text-gray-800'>(22 avis)</span> </Typography>
          </Box>
          <Box className="my-3">
            <Divider/>
          </Box>
          <Box className="flex flex-col">
            <Typography variant="body1" sx={{fontFamily:"Wix Madefor Display"}} gutterBottom>
              "Marion aime les animaux et cela se ressent, elle est à l’écoute, très sympathique, 
              et j’ai beaucoup apprécié qu’elle prenne le temps de m’envoyer régulièrement des"
            </Typography>
            <Box className="flex items-center">
            {x.map((index)=>(<StarIcon key={index} sx={{width:"18px", height:"18px", color:'#ffb942'}}  />))}
            <Typography variant="body2" sx={{color:"#62748b", fontFamily:"Wix Madefor Display", marginLeft:"6px"}}>
            Anatole . Il y a 15 jours
            </Typography>
            </Box>
          </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Demande