import { Box, Typography } from '@mui/material';
import React,{ useEffect } from 'react';
import {myTheme} from "../../theme";
import { useNavigate } from 'react-router';

const Categories = ({categories}) => {
  const navigate = useNavigate();
    useEffect(()=>{
      console.log(categories);
    }, [categories])
  
  return (
    <Box className="px-10 lg:px-20" >
      <Box className="grid grid-cols-2 items-end" >
        <Box >
        <Typography variant='h5' fontFamily="Poppins" fontWeight="bold" color="black" >Vous cherchez quel service?</Typography>
        <Typography variant="body" fontFamily='PT Sans Caption' color={myTheme.palette.gris.main} >Pour chaque situation, trouvez le prestataire dont les compétences répondent à vos attentes et à votre niveau d’exigence.</Typography>
      </Box>
      <Typography variant="body" fontFamily='PT Sans Caption' color={myTheme.palette.gris.main} className='justify-self-end'>Some text</Typography>
      </Box>
      <Box className="py-5 grid md:grid-cols-3 gap-6">
        {categories?.map((categorie,index)=>(
          <Box sx={{height:"235px"}} className="cursor-pointer" onClick={()=>navigate("/categorie/"+categorie.id)} >
          <Box sx={{height:"180px"}} className="bg-blue-400 rounded-xl overflow-hidden" key={index}>
            <img src={require("../../public/image/categorie"+categorie.id+".jpg")}
            className="h-full w-full object-cover hover:translate-y-1 hover:scale-110 transition-transform"
            alt={categorie.nom_categorie} />
          </Box>
          <Typography variant="h6" fontFamily="Poppins" fontWeight="bold" className='hover:text-gray-800 mt-2' >{categorie.nom_categorie}</Typography>
          
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Categories