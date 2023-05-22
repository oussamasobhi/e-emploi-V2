import React, { useEffect, useState } from 'react'
import { getAllAnnonces } from '../util/APIUtils';
import { Box, Toolbar, Typography } from '@mui/material';
import DemandeCarte from './DemandeCarte';

const Demandes = () => {
    const [demandes, setDemandes] = useState(null);
    useEffect(() => {
      const loadDemandes = async () => {
        try{
            const res = await getAllAnnonces();
            setDemandes(res);
        }catch(error){
            console.log(error);
        }
      }
      loadDemandes();
    }, [])
    useEffect(() => {
       console.log(demandes)
    }, [demandes])
    
    
  return (
    <Box className="w-full flex">
    <Box  className="w-full grid grid-cols-1">
      <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold"}} >Demandes</Typography>
      {/*<Box className="my-3">
        <Toolbar>
        <Button variant='outlined' sx={{borderRadius:"28px", size:"medium", marginRight:"14px"}}>En cours</Button>
        <Buttonn variant="outlined" sx={{borderRadius:"28px", size:"medium"}} >Terminé</Buttonn>
        </Toolbar>
      </Box>*/}
      {demandes?.map((demande, index)=>(

     <DemandeCarte key={index} demande={demande} /> 
      ))}          
    </Box>
</Box>
  )
}

export default Demandes