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
    <Box className="p-4" >
    <Box className="w-full flex" >
    {JSON.parse(localStorage.getItem("CURRENT_USER")).role !=="ROLE_Pro" && <Box  className="w-full grid grid-cols-1">
      <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold", marginY:"16px"}} >Demandes</Typography>
      {demandes?.map((demande, index)=>(
     <DemandeCarte key={index} demande={demande} /> 
      ))}          
    </Box>
    }
     {JSON.parse(localStorage.getItem("CURRENT_USER")).role ==="ROLE_Pro" && 
     <Box  className="w-full grid">
      <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold", marginY:"16px"}} >Demandes</Typography>
      <Box className="grid md:grid-cols-2 gap-2">
      {demandes?.map((demande, index)=>(
       <DemandeCarte key={index} demande={demande} setDemandes={setDemandes} /> 
      ))}          
      </Box>
    </Box>
    }
</Box>
</Box>
  )
}

export default Demandes