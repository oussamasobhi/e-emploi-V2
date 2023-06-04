import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { message } from 'antd';
import { getAnnonceById, upadateAnnonce } from '../util/APIUtils';
import { villesMaroc } from '../constant';

const ModifierDemande = ({demande, setDemande, setIsOpenModifier}) => {
    const [newDemande, setNewDemande] = useState(demande);
    const [ville, setVille] = useState(demande.adresse?.ville);
    const [quartier, setQuartier] = useState(demande.adresse?.quartier);
    const [supplement, setSupplement] = useState(demande.adresse?.suplementaire);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleBdChange = (date) => {
        setSelectedDate(date);
      }
    const handleChange = (e) => {        
        const value = e.target.value;
        setNewDemande({...newDemande,[e.target.name]:value});
    }
    useEffect(() => {
     console.log(newDemande);
    }, [newDemande])
    

    const modifier = async() => {
        try{
            const res = await upadateAnnonce(demande.id, newDemande);
            console.log(res);
            message.success({
                content: "Annonce modifiée",
                className: "relative top-6"
            });
            loadDemande();
        }catch(error){
            message.error({
                content: "Modification échouée",
                className: "relative top-6"
            })
            console.log(error);
        }
        setIsOpenModifier(false);
    }

    const loadDemande = async () => {
        try{
          const res = await getAnnonceById(demande.id);
          setDemande(res);
        }catch(error){
          console.log(error);
        }
       }

    useEffect(() => {
        setNewDemande({...newDemande, "date":selectedDate});
      }, [selectedDate])
    useEffect(() => {
      setNewDemande({...newDemande, "ville":ville})
    }, [ville])
    useEffect(() => {
        setNewDemande({...newDemande, "quartier":quartier})
      }, [quartier])
      useEffect(() => {
        setNewDemande({...newDemande, "supplement":supplement})
      }, [ville])
        


  return (
    <Box>
        <form className='flex flex-col'>
         <TextField
              variant="standard"
              label="Durée"
              id="duree"
              name="duree"
              value={newDemande.duree}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              variant="standard"
              label="Information complémentaire"
              id="info_complementaire"
              name="infos_complementaire"
              value={newDemande.infos_complementaire}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: "10px" }}
            />
            <Box className="flex flex-col">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{marginBottom:"15px"}}
                    label="Date"
                    defaultValue={selectedDate}
                    onChange={handleBdChange}
                    renderInput={(params) => <TextField size='small' variant="standard" {...params} />}
                />
                </LocalizationProvider>
            </Box>    
             <FormControl variant="outlined" sx={{ width:"100%", marginBottom:"10px" }} className='bg-slate-200'  >
              <InputLabel>Ville</InputLabel>
              <Select
              size='small'
                defaultValue={ville}
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
             <TextField size='small' label="Quartier" name="quartier" sx={{marginBottom:"10px"}} value={quartier} onChange={handleChange} />
             <TextField size='small' label="Complément" name="supplement" sx={{marginBottom:"10px"}} value={supplement} onChange={handleChange} />
     <Box className="flex justify-end gap-3">
             <Button onClick={()=>setIsOpenModifier(false)}>Fermer</Button>
             <Button variant="contained" onClick={modifier}>Enregistrer</Button>
             </Box>
            </form>
    </Box>
  )
}

export default ModifierDemande