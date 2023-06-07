import React, { useEffect, useState } from 'react'
import { getAllAnnonces, getAllPostulations, getAllSousCatagorie, getAllUsers } from '../util/APIUtils';

import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { key } from 'localforage';
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const Postulations = ({setNbPostulation}) => {
  const [postulations, setPostulations] = useState(null);
  const [sousCategories, setSousCategories] = useState(null);
  const [users, setUsers] = useState(null);
  const [annonces, setAnnonces] = useState(null);
    useEffect(() => {
      const loadPostulations = async () => {
        try{
            const res = await getAllPostulations();
            setPostulations(res);
        }catch(error){
            console.log(error);
        }
      }
      const loadAnnonces = async () => {
        try{
            const res = await getAllAnnonces();
            setAnnonces(res);
        }catch(error){
            console.log(error);
        }
      }
      loadAnnonces();
      loadPostulations();
      const loadSousCategories = async () => {
        try{
            const res = await getAllSousCatagorie();
            setSousCategories(res);
        }catch(error){
            console.log(error)
        }
    }
    loadSousCategories(); 
    const loadUsers = async () => {
        try{
            const res = (await getAllUsers()).content;
            setUsers(res);
        }catch(error){
            console.log(error);
        }
      }
      loadUsers()
    }, [])
    
    useEffect(() => {
        setNbPostulation(postulations?.length)
      console.log(postulations)
    }, [postulations])
    
    
    const columns = [
        {
          field: 'id',
          headerName: 'Prestataire',
          width:130,
          valueGetter: (params, index) => `${(users?.find(obj => obj.id === params.row.id2.iduser).prenom)} ${(users?.find(obj => obj.id === params.row.id2.iduser).nom)}`
        },
        {
            field: "category",
            headerName: "Catégorie",
            width: 170,
            valueGetter: (params) => `${(sousCategories?.find(obj => obj.id === (annonces?.find(obj => obj.id===params.row.id2.idannonce))?.categorie1Annonce)).nom_sous_categorie}`
        },
        {
            field: "statusReservation",
            headerName: "Status"
        }
      ];
      const generateUniqueKey = () => {
        return Math.random().toString(36).substr(2, 9); // Generate a random string as a unique key
      };
    
      const rowsWithKey = postulations?.map((row) => ({ ...row, id2: row.id, id:generateUniqueKey()}));
      if(!postulations || !users || !sousCategories) return <Typography variant="body1">Loading...</Typography>
  return (
    <Box className="bg-slate-200 p-2 rounded-lg my-3" >
    <Typography variant="h6" sx={{fontFamily:"Poppins"}} >Gestion des postulations</Typography>
    {postulations && <DataGrid
                rows={rowsWithKey}
                rowKey={(row) => row.key}
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

export default Postulations