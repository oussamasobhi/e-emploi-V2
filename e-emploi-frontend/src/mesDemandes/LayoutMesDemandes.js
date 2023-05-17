import { Box, Button, Divider, Toolbar, Typography } from '@mui/material'
import React from 'react';

const LayoutMesDemandes = () => {
  const test = true;
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
          <Box className='p-8 rounded-md border-1 grid lg:grid-cols-2 gap-6' sx={{border:1, borderColor:"#cccccc"}}>
            <Box>
              <Box className="h-40 bg-lime-300 rounded-md flex justify-center items-center">
              photo
              </Box>
                <Typography variant='h6' sx={{fontFamily:"Poppins", fontWeight:"bold"}} className="mt-2" >Garder un chien</Typography>
              <Typography variant='body1' sx={{color:'#555555'}} ><span className='font-wix' >Du mardi 06 juin au jeudi 06 Juillet</span> </Typography>
            </Box>
            <Box className="mt-3 lg:mt-0">
              <Divider className='lg:hidden' />
              <Typography variant='body1' sx={{ color:'#555555'}} className='py-4' gutterBottom><span className='font-wix'>Vous n'avez pas reservé de prestataire</span> </Typography>
              <Divider/>
              <Box className="rounded-xl bg-blue-100 flex mt-4" sx={{height:"96px"}} >
              </Box>
            </Box>     
            <Button variant='contained' sx={{width:"100%", borderRadius: "12px", paddingY:"12px", marginTop:"14px"}} className='mt-4' ><span className='capitalize font-poppins' >Gérer</span><span className='lowercase font-poppins' >ma demande</span></Button>       
          </Box>          
        </Box>
    </Box>
  )
}

export default LayoutMesDemandes