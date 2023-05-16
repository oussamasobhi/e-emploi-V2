import { TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Precision = ({annonce, setAnnonce}) => {
    const [detail, setDetail] = useState("");
    const handleChange = (event) => {
        const value = event.target.value;
        setDetail(value);
    }
    useEffect(() => {
      console.log(detail);
      setAnnonce({...annonce, "infos_complementaire":detail});
    }, [detail])
    

  return (
    <>
    <Typography sx={{fontFamily:"Poppins", color:"gray"}} gutterBottom >Détails supplémentaires (optionnel)</Typography>
    <TextField multiline rows={4} value={detail} onChange={handleChange} className='bg-slate-200 w-full' />
    </>
  )
}

export default Precision