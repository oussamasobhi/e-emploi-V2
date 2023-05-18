import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getSousCategories, getSousCategory } from '../util/APIUtils';
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const DemandeCarte = ({demande}) => {
    const navigate = useNavigate();
    const [sousCat, setSousCat] = useState(null);
    const gererDemande = (id) => {
        navigate("/demande/"+id)
      }

      useEffect(() => {
        console.log(demande);
        const loadSouscategorie = async () => {
            try{
                const res = await getSousCategory(demande.categorie1Annonce);
                setSousCat(res);
            }catch(error){
                console.log(error);
            }
        }
        loadSouscategorie();
      }, [demande])
      useEffect(() => {
       console.log(sousCat);
      }, [sousCat])
      
      
    if(!sousCat || !demande){
        return <Typography variant='body1' >Loading...</Typography>
    }
  return (
    <Box key={demande.id} className='p-8 rounded-md border-1 grid lg:grid-cols-2 gap-6 mb-4' sx={{border:1, borderColor:"#cccccc"}}>
        <Box>
          <Box className="h-40 bg-lime-300 rounded-md flex justify-center items-center">
          photo
          </Box>
            <Typography variant='h6' sx={{fontFamily:"Poppins", fontWeight:"bold"}} className="mt-2" >{sousCat.nom_sous_categorie} </Typography>
          <Typography variant='body1' sx={{color:'#555555'}} ><span className='font-wix' >{formatter.format(new Date(demande.date))} </span> </Typography>
        </Box>
        <Box className="mt-3 lg:mt-0">
          <Divider className='lg:hidden' />
          <Typography variant='body1' sx={{ color:'#555555'}} className='py-4' gutterBottom><span className='font-wix'>Vous n'avez pas reservé de prestataire</span> </Typography>
          <Divider/>
          <Box className="rounded-xl bg-blue-100 flex mt-4" sx={{height:"96px"}} >
          </Box>
        </Box>     
        <Button onClick={()=>gererDemande(demande.id)} variant='contained' sx={{width:"100%", borderRadius: "12px", paddingY:"12px", marginTop:"14px"}} className='mt-4' ><span className='capitalize font-poppins' >Gérer</span><span className='lowercase font-poppins' >ma demande</span></Button>       
      </Box>  
  )
}

export default DemandeCarte