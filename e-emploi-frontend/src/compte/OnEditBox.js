import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { updateProfil } from '../util/APIUtils';
import { message } from 'antd';

const OnEditBox = ({titreField, setOnEdit, onEdit, nameField, valueField, setUser, user}) => {
    const [newValue, setNewValue] = useState(valueField);
    const testclick = async () =>{
        console.log(newValue);
        try{
            const res = await updateProfil(user);
            console.log(res);
            message.success({
                content:'Profil modifié',
                className:"relative top-16"
            })
        }catch(error){
            console.log(error);
        }
        setOnEdit(!onEdit)
    }
    useEffect(() => {
      console.log(nameField);
      console.log(valueField)
    }, [nameField, valueField])
    const handleChange = (e) => {
        setNewValue(e.target.value)
    }
    useEffect(() => {
        setUser({...user, [nameField]:newValue})
    }, [newValue])
    

    
  return (
    <>
        <Box className="flex flex-col">
                <TextField size='small' label={titreField} name={nameField} defaultValue={newValue} onChange={handleChange} />
        </Box>
        <Box  className="flex justify-end gap-3 items-center">
            <Button size='small' onClick={()=>setOnEdit(false)}  className="cursor-pointer" variant="outlined" sx={{fontFamily:"Poppins", fontWeight:"bold",}} >Annuler</Button>            
            <Button size='small' color="green" onClick={testclick} className="cursor-pointer" variant="outlined" sx={{fontFamily:"Poppins", fontWeight:"bold",}} >Enregistrer</Button>            
        </Box>
    </>
  )
}

export default OnEditBox