import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

const Competences = () => {
    const breadcrumbs = [
        <Link to="/dboard/moncompte" className='font-poppins font-bold no-underline hover:underline text-blue-400'>
          Mon compte
        </Link>,
        <Typography sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>
          Mes compétences
        </Typography>,
      ];
  return (
    <Box className="p-6" >
        <Box className='mb-4' >
        <Breadcrumbs className='py-2'
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>      
        </Box>
        <Typography variant='h5'>Mes compétences</Typography>
    </Box>
  )
}

export default Competences