import React, { useEffect, useState } from 'react'
import { getAllAnnonces, getAllSousCatagorie } from '../util/APIUtils';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const Annonces = ({setNbAnnonce}) => {
  const [annonces, setAnnonces] = useState(null);
  const [sousCategories, setSousCategories] = useState(null);
    useEffect(() => {
      const loadAnnonces = async () => {
        try{
            const res = await getAllAnnonces();
            setAnnonces(res);
        }catch(error){
            console.log(error);
        }
      }
      loadAnnonces();
      const loadSousCategories = async () => {
        try{
            const res = await getAllSousCatagorie();
            setSousCategories(res);
        }catch(error){
            console.log(error)
        }
    }
    loadSousCategories();    
    }, [])
    useEffect(() => {
      setNbAnnonce(annonces?.length)
    }, [annonces])
   
    
    const columns = [
        {
          field: 'id',
          headerName: 'ID',
        },
        {
          field: 'categorie1Annonce',
          headerName: 'Catégorie',
          editable: true,
          width:240,
          valueGetter: (params) =>
          (sousCategories?.find(obj => obj.id === params.row?.categorie1Annonce))?.nom_sous_categorie          
        },
        {
          field: "duree",
          headerName: "Durée",
          editable: true
        },
        {
          field: 'date',
          headerName: 'Date',
          editable: true,
          valueGetter: (params) =>formatter.format(new Date(params.row.date))
        },
        {
          field: 'userResponse',
          headerName: 'Utilisateur',
          editable: true,
          width:150,
          valueGetter: (params) => `${params.row.userResponse?.prenom} ${params.row.userResponse?.nom}`
        },
        {
          field: "offres",
          headerName: "Offres",
          valueGetter: (params) => params.row.annonceUsers?.length
        },
        {
          field: 'statusAnnonce',
          headerName: 'Statut',
          valueGetter: (params) => params.row.statusAnnonce==="EnCours" ? "En cours" : "Terminée"
        }
        
        
      ];
  
      if(!sousCategories || !annonces) return <Typography variant="body1">Loading...</Typography>
  return (
    <Box className="bg-slate-200 p-2 rounded-lg my-3" >
    <Typography variant="h6" sx={{fontFamily:"Poppins"}} >Gestion des annonces</Typography>
    {annonces && <DataGrid
                rows={annonces}
                columns={columns}
                initialState={{
                pagination: {
                paginationModel: {
                pageSize: 5,
                },
                },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                className='bg-white'
    />}
    </Box>
  )
}

export default Annonces