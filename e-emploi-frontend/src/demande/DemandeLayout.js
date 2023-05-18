import { Box, Breadcrumbs, Typography} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

const DemandeLayout = () => {
    const breadcrumbs = [
        <Link to="/dboard" className='font-wix no-underline hover:underline text-black'>
          Mes demandes
        </Link>,
        <Typography sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>
          Catégorie1 de la demande
        </Typography>,
      ];
  return (
    <Box className='px-10 lg:px-8' sx={{ paddingY:"12px"}} >
          <Breadcrumbs className='py-2'
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
        <Outlet/>
    </Box>
  )
}

export default DemandeLayout