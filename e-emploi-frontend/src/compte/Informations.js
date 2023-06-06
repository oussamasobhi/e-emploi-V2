import { Box, Breadcrumbs, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCurrentUser, deleteUserByUsername, getCurrentUser, updateProfil } from '../util/APIUtils';
import { myTheme } from '../theme';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InfoElement from './InfoElement';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { message } from 'antd';
import { villesMaroc } from '../constant';

const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const breadcrumbs = [
    <Link to="/dboard/moncompte" className='font-poppins font-bold no-underline hover:underline text-blue-400'>
      Mon compte
    </Link>,
    <Typography sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>
      Informations personnelles
    </Typography>,
  ];
const Informations = () => {
  const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [bdEdit, setBdEdit] = useState(false);
    const [adrEdit, setAdrEdit] = useState(false);
    const [adr, setAdr] = useState(null);
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

    const editBd = async () => {
      try{
        const res = await updateProfil(user);
        console.log(res);
        message.success({content:"Profil modifié", className:"relative top-16"})
      }catch(error){
        message.error({content:"Modification échouée", className:"relative top-16"})
        console.log(error);
      }
      setBdEdit(false);
    }
    const handleBdChange = (date) => {
      setSelectedDate(date);
    }

    useEffect(() => {
      setUser({...user, "date_naissance":selectedDate});
      console.log(selectedDate);
    }, [selectedDate])

    const editAdr = async () => {
      try{
        const res = await updateProfil(user);
        console.log(res);
        message.success({content:"Profil modifié", className:"relative top-16"})
      }
      catch(error){
        message.error({content:"Modification échouée", className:"relative top-16"})
        console.log(error);
      }
      setAdrEdit(false);
    }
    const handleChange = (e) => {
      setAdr({...adr, [e.target.name]:e.target.value});
    }
    useEffect(() => {
      setUser({...user, "adresse":adr})
    }, [adr])
    
    const supprimer = async () => {
      try{
        const res = await deleteCurrentUser();
        console.log(res);
        localStorage.setItem("token", "");
        navigate("/login");
      }catch(error){
        console.log(error);
      }
      setIsOpenDelete(false);
    }
    
    

 
    if(!user) return <Typography>Loading...</Typography>
  return (
    <>
    <Box className='md:mr-12 p-6'>
        <Box className='mb-4' >
        <Breadcrumbs className='py-2'
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>      
        </Box>
        <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold", marginBottom:"20px"}} >Informations personnelles</Typography>
        <InfoElement key="prenom" user={user} setUser={setUser} titreField="Prénoms" nameField="prenom" valueField={user.prenom} />  
        <InfoElement key="nom" user={user} setUser={setUser} titreField="Nom" nameField="nom" valueField={user.nom} />  
        <InfoElement key="email" user={user} setUser={setUser} titreField="Adresse Email" nameField="email" valueField={user.email} /> 
        <InfoElement key="num_tel" user={user} setUser={setUser} titreField="Numéro Téléphone" nameField="num_tel" valueField={user.num_tel} />   
       
        <Box className="flex justify-between items-center py-4 pr-5" >
          {!bdEdit && (
          <>
            <Box className="flex flex-col">
                <Typography variant='body2' sx={{fontFamily:"Wix Madefor Display"}}>Date de naissance</Typography>
                <Typography variant='body1' sx={{fontFamily:"Poppins", fontWeigth:"bold"}}>
                {user.date_naissance? formatter.format(new Date(user.date_naissance)) :"Non renseignée"}
                </Typography>
            </Box>
            <Typography onClick={()=>setBdEdit(true)} className="cursor-pointer" variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold", color:myTheme.palette.blue.second}} >Modifier</Typography>
          </>
          )}
          {bdEdit && (
          <>
            <Box className="flex flex-col">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Date de naissance"
        value={selectedDate}
        defaultValue={user.date_naissance}
        onChange={handleBdChange}
        renderInput={(params) => <TextField size='small' variant="standard" {...params} />}
        />
        </LocalizationProvider>
            </Box>
            <Box  className="flex justify-end gap-3 items-center">
              <Button size='small' onClick={()=>setBdEdit(false)}  className="cursor-pointer" variant="outlined" sx={{fontFamily:"Poppins", fontWeight:"bold",}} >Annuler</Button>            
              <Button size='small' color="green" onClick={editBd} className="cursor-pointer" variant="outlined" sx={{fontFamily:"Poppins", fontWeight:"bold",}} >Enregistrer</Button>            
            </Box>
          </>
          )}
            
        </Box>
        <Divider/>
        <Box className="flex justify-between items-center py-4 pr-5" >
          {!adrEdit && (
            <>
            <Box className="flex flex-col">
                <Typography variant='body2' sx={{fontFamily:"Wix Madefor Display"}}>Adresse</Typography>
                <Typography variant='body1' sx={{fontFamily:"Poppins", fontWeigth:"bold"}}>
                {user.adresse? (
                <>
                {(user.adresse?.suplementaire && (user.adresse?.suplementaire!=="" || user.adresse?.suplementaire!==null)) && <span className='text-gray-800 '>{user.adresse?.suplementaire},&nbsp; </span>}
                {(user.adresse?.quartier && (user.adresse?.quartier!=="" || user.adresse?.quartier!==null)) && <span className='text-gray-800 '>{user.adresse?.quartier},&nbsp; </span>}
                {(user.adresse?.ville && (user.adresse?.ville!=="" || user.adresse?.ville!==null)) && <span className='text-gray-800 '>{user.adresse?.ville} </span>}
                </>
                )
                :"Non renseignée"
                }
                </Typography>
            </Box>
            <Typography onClick={()=>setAdrEdit(true)} className="cursor-pointer" variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold", color:myTheme.palette.blue.second}} >Modifier</Typography>
            </>
          )}
          {adrEdit && (<>
            <Box className="flex flex-col">
            <FormControl variant="outlined" sx={{ width:"100%", marginBottom:"10px" }} className='bg-slate-200'  >
              <InputLabel>Ville</InputLabel>
              <Select
              size='small'
                defaultValue=""
                label="Ville"
                name="ville"
                onChange={handleChange}
              >
                {villesMaroc?.map((ville, index) => (
                  <MenuItem key={index} value={ville}>
                    {ville}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField size='small' label="Quartier" name="quartier" sx={{marginBottom:"10px"}} defaultValue={user.adresse?.quartier} onChange={handleChange} />
            <TextField size='small' label="Complément" name="suplementaire" sx={{marginBottom:"10px"}} defaultValue={user.adresse?.suplementaire} onChange={handleChange} />
            </Box>
            <Box  className="flex justify-end gap-3 items-center">
              <Button size='small' onClick={()=>setAdrEdit(false)}  className="cursor-pointer" variant="outlined" sx={{fontFamily:"Poppins", fontWeight:"bold",}} >Annuler</Button>            
              <Button size='small' color="green" onClick={editAdr} className="cursor-pointer" variant="outlined" sx={{fontFamily:"Poppins", fontWeight:"bold",}} >Enregistrer</Button>            
            </Box>
          </>)}
            
        </Box>
        <Divider/>
        {/*<Box className="flex justify-end mt-2">
          <Button sx={{color:myTheme.palette.red.main}} onClick={()=>setIsOpenDelete(true)} >Supprimer votre compte</Button> 
        </Box>*/}
    </Box>
    {/*<Modal
        open={isOpenDelete}
        onClose={()=>setIsOpenDelete(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{position:'absolute', top:"50%", left:'50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">VOule</h2>
            <Typography>Voulez-vous supprimer votre compte?</Typography>
            <Button onClick={()=>setIsOpenDelete(false)}>Fermer</Button>
            <Button onClick={supprimer} >Confirmer</Button>
          </Box>
      </Modal>*/}
    </>
  )
}

export default Informations