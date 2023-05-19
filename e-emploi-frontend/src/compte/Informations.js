import { Box, Breadcrumbs, Button, Divider, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../util/APIUtils';
import { myTheme } from '../theme';
import OnEditBox from './OnEditBox';
import InfoElement from './InfoElement';

const breadcrumbs = [
    <Link to="/dboard/moncompte" className='font-poppins font-bold no-underline hover:underline text-blue-400'>
      Mon compte
    </Link>,
    <Typography sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>
      Informations personnelles
    </Typography>,
  ];
const Informations = () => {
    const [user, setUser] = useState(null);
    const [onEdit, setOnEdit] = useState(false);
    useEffect(() => {
      const loadUser = async () => {
        try {
          const res = await getCurrentUser();
          setUser(res);
        } catch (error) {
          console.log(error);
        }
      };
      loadUser();
    }, []);
  
    useEffect(() => {
      console.log(user);
    }, [user]);
 
    if(!user) return <Typography>Loading...</Typography>
  return (
    <Box className='md:mr-12'>
        <Box className='mb-4' >
        <Breadcrumbs className='py-2'
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>      
        </Box>
        <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold", marginBottom:"20px"}} >Informations personnelles</Typography>
        <InfoElement user={user} setUser={setUser} titreField="Prénoms" nameField="prenom" valueField={user.prenom} />  
        <InfoElement user={user} setUser={setUser} titreField="Nom" nameField="nom" valueField={user.nom} />  
        <InfoElement user={user} setUser={setUser} titreField="Adresse Email" nameField="email" valueField={user.email} /> 
        <InfoElement user={user} setUser={setUser} titreField="Numéro Téléphone" nameField="num_tel" valueField={user.num_tel} />   
        {/*<Box className="flex justify-between items-center py-4 pr-5" >
            <Box className="flex flex-col">
                <Typography variant='body2' sx={{fontFamily:"Wix Madefor Display"}}>Mot de passe</Typography>
                <Typography variant='body1' sx={{fontFamily:"Poppins", fontWeigth:"bold"}}>{user.prenom} </Typography>
            </Box>
            <Typography className="cursor-pointer" variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold", color:myTheme.palette.blue.second}} >Modifier</Typography>
        </Box>
  <Divider/>*/}
        <Box className="flex justify-between items-center py-4 pr-5" >
            <Box className="flex flex-col">
                <Typography variant='body2' sx={{fontFamily:"Wix Madefor Display"}}>Date de naissance</Typography>
                <Typography variant='body1' sx={{fontFamily:"Poppins", fontWeigth:"bold"}}>
                {user.date_naissance?"date de naissance":"Non renseignée"}
                </Typography>
            </Box>
            <Typography className="cursor-pointer" variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold", color:myTheme.palette.blue.second}} >Modifier</Typography>
        </Box>
        <Divider/>
        <Box className="flex justify-between items-center py-4 pr-5" >
            <Box className="flex flex-col">
                <Typography variant='body2' sx={{fontFamily:"Wix Madefor Display"}}>Adresse</Typography>
                <Typography variant='body1' sx={{fontFamily:"Poppins", fontWeigth:"bold"}}>
                {user.adresses?"Adresse":"Non renseignée"}
                </Typography>
            </Box>
            <Typography className="cursor-pointer" variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold", color:myTheme.palette.blue.second}} >Modifier</Typography>
        </Box>
        <Divider/>

    </Box>
  )
}

export default Informations