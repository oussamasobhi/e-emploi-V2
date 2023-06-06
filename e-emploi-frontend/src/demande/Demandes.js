import React, { Fragment, useEffect, useState } from 'react'
import { filtrerAnnonce, getAllAnnonces, getCategories } from '../util/APIUtils';
import { Autocomplete, Box, Button, Checkbox, Divider, Drawer, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Toolbar, Typography} from '@mui/material';
import DemandeCarte from './DemandeCarte';
import CloseIcon from '@mui/icons-material/Close';
import { villesMaroc } from '../constant';

const Demandes = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [categories, setCategories] = useState(null);
  const [selectedVille, setSelectedVille] = useState("");
    const [demandes, setDemandes] = useState(null);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [searchRequest, setSearchRequest] = useState({
      Ville : "",
      id_categorie_1_annonce: ""
    })
    useEffect(() => {
      const loadDemandes = async () => {
        try{
            const res = await getAllAnnonces();
            setDemandes(res);
        }catch(error){
            console.log(error);
        }
      }
      loadDemandes();
      const loadCategories = async () => {
        try{
          const res = await getCategories();
          setCategories(res);
        }catch(error){
          console.log(error);
        }
      }
      loadCategories();
    }, [])
    useEffect(() => {
       console.log(demandes)
    }, [demandes])

    const filtrer = async () => {
      console.log(searchRequest);
      try{
        const res = await filtrerAnnonce(searchRequest);
        console.log(res);
      }catch(error){
        console.log(error);
      }
      setIsOpenDrawer(false);
    }
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    }
    const handleVilleChange = (event, value) => {
      setSelectedVille(value);
    }
    useEffect(() => {
      console.log(selectedValue);
      setSearchRequest({...searchRequest, id_categorie_1_annonce:selectedValue});
    }, [selectedValue])
    useEffect(() => {
      //console.log(selectedVille);
      setSearchRequest({...searchRequest, Ville:selectedVille});
    }, [selectedVille])
    
    
    
    
  return (
    <>
    <Box className="p-4" >
    <Box className="w-full flex" >
    {JSON.parse(localStorage.getItem("CURRENT_USER")).role ==="ROLE_STANDARD" && <Box  className="w-full grid grid-cols-1">
      <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold", marginY:"16px"}} >Demandes</Typography>
      {demandes?.map((demande, index)=>(
     <DemandeCarte key={index} demande={demande} /> 
      ))}          
    </Box>
    }
     {JSON.parse(localStorage.getItem("CURRENT_USER")).role !=="ROLE_STANDARD" && 
     <Box  className="w-full grid bg-gray-50 p-4">
      <Box className="flex justify-between items-end">
      <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold", marginBottom:"16px"}} >Demandes</Typography>
      <Box><Button onClick={()=>setIsOpenDrawer(true)} >Filtrer</Button> </Box>
      </Box>
      <Box className="h-14 bg-red-300" >
        
      </Box>
      
      <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {demandes?.map((demande, index)=>(
      <DemandeCarte key={index} demande={demande} setDemandes={setDemandes} /> 
      ))}          
      </Box>
    </Box>
    }
</Box>
</Box>
<Drawer
        
        variant="temporary"
        anchor="right"
        open={isOpenDrawer}
        onClose={()=>setIsOpenDrawer(false)}
      >
        <div className='w-[210px] relative top-[70px]' >
          {/* Drawer content */}
          <Button className=' w-full flex gap-6 justify-end' onClick={()=>setIsOpenDrawer(false)}>
            Filtrer
            <CloseIcon/>
          </Button>
          <Divider/>
          <Box className="px-2">
    <FormGroup>
      <Typography sx={{fontFamily:"Poppins", paddingY:"10px"}} >Catégories</Typography>
      <RadioGroup value={selectedValue} onChange={handleChange} >
      {categories?.map((cat)=>(
         <FormControlLabel value={cat.id} key={cat.id+"souscat"} control={
        <Radio />}
        label={cat.nom_categorie} />
      ))}
      </RadioGroup>
    </FormGroup>
  </Box>
  <Box className="px-2">
    <Divider/>
  <Typography sx={{fontFamily:"Poppins", paddingY:"10px"}} >Ville</Typography>
  <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={handleVilleChange}
      options={villesMaroc}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} label="Ville" />}
    />
  </Box>
  <Box className="flex items-center justify-center mt-4">
          <Button variant='contained' onClick={filtrer} >Valider</Button>
        </Box>
        </div>
        
      </Drawer>
</>
  )
}

export default Demandes