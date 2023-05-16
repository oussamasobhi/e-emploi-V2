import { Box, FormControl, Select, TextField, MenuItem, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { villesMaroc } from '../constant';


const Lieu = ({annonce, setAnnonce}) => {
const [adresse, setAdresse] = useState({
    ville:"",
    quartier:"",
    suplementaire:""
})
const handleChange = (event) => {
    const value = event.target.value;
    setAdresse({...adresse, [event.target.name]:value});
}
useEffect(() => {
  console.log(adresse);
  setAnnonce({...annonce, "adressee":adresse});
}, [adresse])

  return (
    <Box className="flex flex-col">
        <Box className='grid grid-cols-2 gap-4 mb-4'>
        <FormControl variant="outlined" sx={{ width:"100%" }} className='bg-slate-200'  >
              <InputLabel>Ville</InputLabel>
              <Select
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
        <TextField value={adresse.quartier} onChange={handleChange} variant="outlined" className='bg-slate-200'  label="quartier" name="quartier" />
        </Box>
        
        <TextField value={adresse.suplementaire} onChange={handleChange} variant="outlined" className='bg-slate-200' label="Précision" name="suplementaire"/>
    </Box>
  )
}

export default Lieu