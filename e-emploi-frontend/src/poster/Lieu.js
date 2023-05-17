import { Box, FormControl, Select, TextField, MenuItem, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { villesMaroc } from '../constant';


const Lieu = ({annonce, setAnnonce}) => {
/*const [adresse, setAdresse] = useState({
    ville:"",
    quartier:"",
    supplement:""
})*/
const handleChange = (event) => {
    const value = event.target.value;
    //setAdresse({...adresse, [event.target.name]:value});
    setAnnonce({...annonce, [event.target.name]:value});
}
/*useEffect(() => {
  console.log(adresse);
}, [adresse])*/

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
        <TextField value={annonce.quartier} onChange={handleChange} variant="outlined" className='bg-slate-200'  label="quartier" name="quartier" />
        </Box>
        
        <TextField value={annonce.supplement} onChange={handleChange} variant="outlined" className='bg-slate-200' label="Précision" name="supplement"/>
    </Box>
  )
}

export default Lieu