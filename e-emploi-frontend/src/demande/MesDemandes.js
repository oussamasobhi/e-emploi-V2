import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnnoncesByUserId } from '../util/APIUtils';
import { Box, Button, Divider, Toolbar, Typography } from '@mui/material'
import DemandeCarte from './DemandeCarte';



const MesDemandes = ({currentUser}) => {
  const [mesDemandes, setMesDemandes] = useState(null);
  
  useEffect(() => {
    const loadMesDemandes = async () => {
      try{
        const res = await getAnnoncesByUserId(currentUser.id);
        setMesDemandes(res);
      }catch(error){
        console.log(error);
      }
    }
    loadMesDemandes();
  }, [currentUser])
  
  useEffect(() => {
   console.log(mesDemandes);
  }, [mesDemandes]);
  
  
  return (
    <Box className="w-full flex">
    <Box  className="w-full grid grid-cols-1">
      <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold"}} >Mes demandes</Typography>
      <Box className="my-3">
        <Toolbar>
        <Button variant='outlined' sx={{borderRadius:"28px", size:"medium", marginRight:"14px"}}>En cours</Button>
        <Button variant="outlined" sx={{borderRadius:"28px", size:"medium"}} >Terminé</Button>
        </Toolbar>
      </Box>


      {mesDemandes?.map((demande)=>(

     <DemandeCarte demande={demande} /> 
      ))}          
    </Box>
</Box>
  )
}

export default MesDemandes