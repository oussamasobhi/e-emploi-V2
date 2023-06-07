import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { myTheme } from '../../theme'
import StarRatings from 'react-star-ratings';
import { getReviews, getCompetencesByUserId } from '../../util/APIUtils';
import { useNavigate } from 'react-router';

const Profil = ({pro}) => {
  const navigate = useNavigate();
    const [rate, setRate] = useState(-1);
    const [competences, setCompetences] = useState(null);
    useEffect(() => {
      const loadCompetences = async () => {
        try{
          const res = await getCompetencesByUserId (pro.id);
          setCompetences(res);
          
        }catch(error){
          console.log(error)
        }
      }
      if(pro) loadCompetences();
      const loadRate = async () => {
        try {
          const res = await getReviews(pro?.id);
          setRate(res);
        } catch (error) {
          console.log(error);
        }
      };
      loadRate();
    }, [pro])
    
  return (
    <Box className="p-4 shadow-md rounded-md bg-white" sx={{border:1, borderColor:"#cccccc"}}>
        <Box className="flex gap-3">
        {!pro?.photo_profil && <Avatar
            alt="Photo de profil"        
            sx={{width:"80px", height:"80px"}}
        >
            <PersonIcon sx={{width:"60%",height:"60%"}} />
        </Avatar>}
        {pro?.photo_profil && <Avatar
            alt="Photo de profil"        
            sx={{width:"80px", height:"80px"}}
            src={require("../../public/files/"+pro?.photo_profil?.name)}
       />}
        <Box>
        <Typography variant="h6" sx={{fontFamily:"Poppins", fontWeight:"bold"}} > {pro.prenom} {pro.nom} </Typography>
        <Typography variant="body2" sx={{fontFamily:"Wix Madefor Display"}}><span className='text-gray-600'>{pro.num_tel}</span> </Typography>
        <Box className="flex"><StarRatings
                      rating={rate}
                      starRatedColor="orange"
                      starDimension="20px"
                      starSpacing="3px"
                    />  {rate > 0 && (
                      <span className="text-gray-600 font-mukta">
                        ({rate.toFixed(1)})
                      </span>
                    )}</Box>
        </Box>
        </Box>
        <Box className="">
            <Typography variant="h6" sx={{fontFamily:"Poppins"}}><span className='text-blue-500'>Compétences</span></Typography>
            {competences?.slice(0,4)?.map((comp)=>(
              <Typography variant="body2" key={comp.id+"comp"} sx={{fontFamily:"Wix Madefor Display"}} >{comp.nom_sous_categorie}</Typography>
            )) }
        </Box>
      
    </Box>
  )
}

export default Profil;