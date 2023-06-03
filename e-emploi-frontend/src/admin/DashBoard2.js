import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Users from './Users';
import Annonces from './Annonces';
import Competences from './Competences';
import Postulations from './Postulations';


const DashBoard2 = () => {
   const [nbUser, setNbUser] = useState(0);
   const [nbAnnonce, setNbAnnonce] = useState(0);
   const [nbCompetences, setNbCompetences] = useState(0);
   const [nbPostulations, setNbPostulations] = useState(0);
      
  return (
    <Box className="p-6">
        <Typography variant="h4"><span className='font-poppins font-bold' >Dashboard</span></Typography> 
        <Divider/>
        <Box className="grid grid-cols-2 gap-4 lg:grid-cols-4 my-3" >
            <Box className="h-[120px] bg-gray-200 flex flex-col w-full">
                <Box className="h-[30px] w-full">
                <Typography variant="subtitle1" sx={{textAlign:"center"}}><span className='font-poppins '>Utilisateurs</span> </Typography>
                </Box>
                <Divider/>
                <Box className="flex items-center justify-center w-full h-full">
                <Typography variant="h3"><span className='font-poppins '>{nbUser}</span> </Typography>
                </Box>
            </Box>
            <Box className="h-[120px] bg-gray-200 flex flex-col w-full">
                <Box className="h-[30px] w-full">
                <Typography variant="subtitle1" sx={{textAlign:"center"}}><span className='font-poppins '>Compétences</span> </Typography>
                </Box>
                <Divider/>
                <Box className="flex items-center justify-center w-full h-full">
                <Typography variant="h3"><span className='font-poppins '>{nbCompetences}</span> </Typography>
                </Box>
            </Box>
            <Box className="h-[120px] bg-gray-200 flex flex-col w-full">
                <Box className="h-[30px] w-full">
                <Typography variant="subtitle1" sx={{textAlign:"center"}}><span className='font-poppins '>Annonces</span> </Typography>
                </Box>
                <Divider/>
                <Box className="flex items-center justify-center w-full h-full">
                <Typography variant="h3"><span className='font-poppins '>{nbAnnonce} </span> </Typography>
                </Box>
            </Box>
            <Box className="h-[120px] bg-gray-200 flex flex-col w-full">
                <Box className="h-[30px] w-full">
                <Typography variant="subtitle1" sx={{textAlign:"center"}}><span className='font-poppins '>Postulations</span> </Typography>
                </Box>
                <Divider/>
                <Box className="flex items-center justify-center w-full h-full">
                <Typography variant="h3"><span className='font-poppins '>{nbPostulations}</span> </Typography>
                </Box>
            </Box>
        </Box>
        <Divider/>
        
            <Users setNbUser={setNbUser} />
            <Divider/>
            <Box className="flex gap-1">
                <Box className="w-1/2"><Competences setNbCompetences={setNbCompetences} /></Box>
                <Box className="w-1/2"><Postulations setNbPostulation={setNbPostulations} /> </Box>            
            </Box>
            <Divider/>
            <Annonces setNbAnnonce={setNbAnnonce} />
    </Box>
  )
}

export default DashBoard2