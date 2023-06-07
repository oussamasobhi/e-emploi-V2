import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getAllUsers } from '../../util/APIUtils';
import { Box, Typography } from '@mui/material';
import Profil from './Profil';
import { myTheme } from '../../theme';

const Profils = () => {
    const [prestataires, setPrestataires] = useState(null);
    useEffect(() => {
        const loadUsers = async () => {
            try {
              const res = (await getAllUsers()).content;
              setPrestataires(res);
            } catch (error) {
              console.log(error);
            }
          };
        loadUsers();
    }, [])
    useEffect(() => {
      console.log(prestataires?.slice(0,3));
    }, [prestataires])
    
    
    
  return (
    <Box className="px-4 py-4 lg:px-20" >
      <Box className="" >
      
        <Typography variant='h5' fontFamily="Poppins" fontWeight="bold" color="black" >Quelques profils de nos prestataires</Typography>
        <Typography variant="body" fontFamily='PT Sans Caption' color={myTheme.palette.gris.main} >Vous pouvez les contacter directement pour réaliser votre service.</Typography>
      
      </Box>
      <Box className="py-5 grid md:grid-cols-3 gap-8">
        {prestataires?.map((pro)=>(
            pro?.role==="ROLE_Pro" &&
         <Profil key={"pro"+pro.id} pro={pro} />
        ))}
      </Box>
    </Box>
  )
}

export default Profils