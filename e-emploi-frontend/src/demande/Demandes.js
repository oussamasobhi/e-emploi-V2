import React, { Fragment, useEffect, useState } from 'react'
import { filtrerAnnonce, getAllAnnonces, getCategories } from '../util/APIUtils';
import { Autocomplete, Box, Button, Checkbox, Divider, Drawer, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Toolbar, Typography} from '@mui/material';
import DemandeCarte from './DemandeCarte';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { villesMaroc } from '../constant';

const Demandes = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [categories, setCategories] = useState(null);
  const [selectedVille, setSelectedVille] = useState("");
    const [demandes, setDemandes] = useState(null);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [searchRequest, setSearchRequest] = useState({
      ville : "",
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
      try{
        if(selectedValue==='1'){
          console.log("categorie 1")
        const res1 = (await filtrerAnnonce(selectedVille, 1)).content;
        const res2 = (await filtrerAnnonce(selectedVille, 2)).content;
        const res3 = (await filtrerAnnonce(selectedVille, 3)).content;
        const res4 = (await filtrerAnnonce(selectedVille, 4)).content;
        setDemandes([...res1, ...res2, ...res3, ...res4]);
      }
      if(selectedValue==='2'){
        console.log("categorie 2")
        const res1 = (await filtrerAnnonce(selectedVille, 5)).content;
        const res2 = (await filtrerAnnonce(selectedVille, 6)).content;
        const res3 = (await filtrerAnnonce(selectedVille, 7)).content;
        setDemandes(res1.concat(res2.concat(res3)));
      }   
      if(selectedValue==='3'){
        console.log("categorie 3")
        const res1 = (await filtrerAnnonce(selectedVille, 8)).content;
        const res2 = (await filtrerAnnonce(selectedVille, 9)).content;
        const res3 = (await filtrerAnnonce(selectedVille, 10)).content;
        const res4 = (await filtrerAnnonce(selectedVille, 11)).content;
        const res5 = (await filtrerAnnonce(selectedVille, 12)).content;
        setDemandes([...res1, ...res2, ...res3, ...res4, ...res5]);
      }      
      if(selectedValue==='4'){
        console.log("categorie 4")
        const res1 = (await filtrerAnnonce(selectedVille,13)).content;
        const res2 = (await filtrerAnnonce(selectedVille,14)).content;
        const res3 = (await filtrerAnnonce(selectedVille,15)).content;
        setDemandes([...res1, ...res2, ...res3]);
      }   
      if(selectedValue==='5'){
        console.log("categorie 5")
        const res1 = (await filtrerAnnonce(selectedVille, 16)).content;
        const res2 = (await filtrerAnnonce(selectedVille, 17)).content;
        const res3 = (await filtrerAnnonce(selectedVille, 18)).content;
        const res4 = (await filtrerAnnonce(selectedVille, 19)).content;
        setDemandes([...res1, ...res2, ...res3, ...res4]);
      }
      if(selectedValue==='6'){
        console.log("categorie 6")
        const res1 = (await filtrerAnnonce(selectedVille, 20)).content;
        const res2 = (await filtrerAnnonce(selectedVille, 21)).content;
        const res3 = (await filtrerAnnonce(selectedVille, 22)).content;
        const res4 = (await filtrerAnnonce(selectedVille, 23)).content;
        setDemandes([...res1, ...res2, ...res3, ...res4]);
      }
      if(selectedValue==='7'){
        console.log("categorie 7")
        const res1 = (await filtrerAnnonce(selectedVille, 24)).content;
        const res2 = (await filtrerAnnonce(selectedVille, 25)).content;
        const res3 = (await filtrerAnnonce(selectedVille, 26)).content;
        const res4 = (await filtrerAnnonce(selectedVille, 27)).content;
        setDemandes([...res1, ...res2, ...res3, ...res4]);
      }
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
      //setSearchRequest({...searchRequest, id_categorie_1_annonce:selectedValue});
    }, [selectedValue])
    useEffect(() => {
      console.log(selectedVille);
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
      <Box>
        <Button onClick={()=>setIsOpenDrawer(true)} >
          <FilterListIcon/>
          Filtrer
        </Button> 
        </Box>
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