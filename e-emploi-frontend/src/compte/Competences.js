import { Box, Breadcrumbs, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { getAllSousCatagorie, getCategories, getCompetencesByUserId, getCurrentUser, getSousCategories, updateProfil } from '../util/APIUtils';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { myTheme } from '../theme';
import { message } from 'antd';

const Competences = () => {
  const theme = useTheme();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [competences, setCompetences] = useState(null);
  const [sousCategories, setSousCategories] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [newSoucat, setNewSousCat] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const userId = JSON.parse(localStorage.getItem("CURRENT_USER")).id;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      try{
        const res = await getCurrentUser();
        console.log(res);
        setUser(res);
      }catch(error){
        console.log(error);
      }
      
    }
    
    const loadCategories = async () => {
      try{
        const res = await getCategories();
        setCategories(res);
      }catch(error){
        console.log(error);
      }
    }
    
    loadUser();
    loadCategories();
  }, [])
  useEffect(() => {
    const loadSousCategories = async () => {
      try{
        const res = await getSousCategories(selectedCat);
        setSousCategories(res);
      }catch(error){
        console.log(error);
      }
    }
    loadSousCategories();
  }, [selectedCat])
  
  useEffect(() => {
    console.log(categories);
  }, [categories])
  
  
  useEffect(() => {
    const loadCompetences = async () => {
      try{
        const res = await getCompetencesByUserId(userId);
        setCompetences(res);
        
      }catch(error){
        console.log(error)
      }
    }
    if(userId) loadCompetences();
  }, [userId])
  const handleCatChange = (event) => {
    setSelectedCat(event.target.value);
  }
  
  useEffect(() => {
    console.log(competences);
  }, [competences])
  
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "nom_sous_categorie",
      headerName: "Libellé",
      width: 250
    }
  ];
  const handleRowSelection = (params) => {
    setSelectedRowIds(params);
  };
  
  
  const details = (params) => {
   
  }
  useEffect(() => {
    console.log(checkedItems);
    setNewSousCat(competences?.concat(sousCategories?.filter(obj => checkedItems?.includes(obj.id))));
    
  }, [checkedItems])
  useEffect(() => {
    setUser({...user, competences:newSoucat});
  }, [newSoucat])
  
  

  useEffect(() => {
    //console.log(selectedRowIds);
    const nouveauxCompId = competences?.filter(obj => !selectedRowIds.includes(obj.id));
    setUser({...user, competences : nouveauxCompId});
  }, [selectedRowIds])
  
  const supprimer = async () => {
    try{
      const res = await updateProfil(user);
      console.log(res);
      loadCompetences();
      message.success({
        content: "Compétences supprimées",
        className: "relative top-16"
      });
    }catch(error){
      console.log(error)
    }
    setIsOpenDelete(false);
  }
  useEffect(() => {
    console.log(user);
  }, [user])
  

  const loadCompetences = async () => {
    try{
      const res = await getCompetencesByUserId(userId);
      setCompetences(res);
    }catch(error){
      console.log(error)
    }
  }


  const handleChange = (event) => {
    const checkedId = parseInt(event.target.value);
    if (event.target.checked) {
      setCheckedItems([...checkedItems, checkedId]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== checkedId));
    }
  };
  

  const ajouter = async () => {
    console.log(user);
    try{
      const res = await updateProfil(user);
      console.log(res);
      loadCompetences();
      message.success({
        content: "Nouvelles compétences ajoutées",
        className: "relative top-16"
      });
    }catch(error){
      console.log(error)
    }
    setIsOpenAdd(false);
  }


    const breadcrumbs = [
        <Link key="bdc1" to="/dboard/moncompte" className='font-poppins font-bold no-underline hover:underline text-blue-400'>
          Mon compte
        </Link>,
        <Typography key="bdc2" sx={{fontFamily:"Wix Madefor Display", color:"gray"}}>
          Mes compétences
        </Typography>,
      ];
  return (
    <>
    <Box className="p-6" >
        <Box className='mb-4' >
        <Breadcrumbs className='py-2'
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>      
        </Box>
        
        <Typography variant='h5'>Mes compétences</Typography>
        
        
        <Box>
        {competences && 
          <DataGrid
                rows={competences}
                columns={columns}
                rowSelectionModel={selectedRowIds}
                onRowSelectionModelChange={handleRowSelection}
                initialState={{
                pagination: {
                paginationModel: {
                pageSize: 5,
                },
                },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                className='bg-white'
            />}
            <Box>
            <Button onClick={()=>setIsOpenAdd(true)}>Ajouter</Button>
              <Button onClick={()=>setIsOpenDelete(true)} disabled={selectedRowIds?.length<1} >Supprimer</Button>
            </Box>
        </Box>
    </Box>
    {/*Ajouter */}
    <Modal
       open={isOpenAdd}
        onClose={()=>setIsOpenAdd(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">Ajouter des compétences</h2>
            <Box className="" >
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedCat}
    variant='standard'
    label="Catégorie"
    onChange={handleCatChange}
  >
    {categories?.map((cat)=>
      (
        <MenuItem key={"cat"+cat.id} value={cat.id}>{cat?.nom_categorie}</MenuItem>
      )
    )}
  </Select>
</FormControl>
{selectedCat && (
  <Box>
    <FormGroup>
      {sousCategories?.map((souscat)=>(
         !competences.some(obj => obj.id===souscat.id) && 
         <FormControlLabel key={souscat.id+"souscat"} control={
        <Checkbox id={souscat.id} name={souscat.id} checked={checkedItems.includes(souscat.id)} value={souscat.id} onChange={handleChange}  />}
        label={souscat.nom_sous_categorie} />
      ))}
    </FormGroup>
  </Box>
)}
            </Box>
            <Button onClick={()=>setIsOpenAdd(false)}>Fermer</Button>
            <Button onClick={ajouter} >Confirmer</Button>
          </Box>
      </Modal>
      {/*Supprimer*/}
      <Modal
        open={isOpenDelete}
        onClose={()=>setIsOpenDelete(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box  sx={{position:'absolute', top:"50%", left:'50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">Supprimer des compétences</h2>
            <Typography>Voulez-vous supprimer ces compétences?</Typography>
            <Button onClick={()=>setIsOpenDelete(false)}>Fermer</Button>
            <Button onClick={supprimer} >Confirmer</Button>
          </Box>
      </Modal>
    </>
  )
}

export default Competences