import { Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllAnnonces, getAllSousCatagorie, getAnnonceUserByIdUser, getCurrentUser, getPostulationsByUserId } from '../util/APIUtils';
import Proposition from './Proposition';
import { DataGrid } from '@mui/x-data-grid';
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const Propositions = () => {
    const [propositions, setPropositions] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [sousCategories, setSousCategories] = useState(null);
    const [annonces, setAnnonces] = useState(null);
    const [postulation, setPostulation] = useState(null);
    useEffect(() => {
        const loadCurrentUser = async () => {
            try{
                const res = await getCurrentUser();
                setCurrentUser(res);
            }catch(error){
                console.log(error);
            }
        }
        loadCurrentUser();
        const loadSousCategories = async () => {
            try{
                const res = await getAllSousCatagorie();
                setSousCategories(res);
            }catch(error){
                console.log(error)
            }
        }
        loadSousCategories(); 
        const loadAnnonces = async () => {
            try{
                const res = await getAllAnnonces();
                setAnnonces(res);
            }catch(error){
                console.log(error);
            }
          }
    }, [])
    useEffect(() => {
        const loadPropositions = async () => {
            try{
                const res = await getPostulationsByUserId(currentUser.id);
                setPropositions(res);
            }catch(error){
                console.log(error);
            }
          }
         if(currentUser) loadPropositions();
    }, [currentUser])
    

    useEffect(() => {
      console.log(propositions)
    }, [propositions])

    const columns = [
        {
            field: "id",
            headerName:"ID",
        },
        {
            field: "categorie1Annonce",
            headerName: "Catégorie",
            width: 180,
            valueGetter: (params) => (sousCategories?.find(obj => obj.id === params.row.categorie1Annonce))?.nom_sous_categorie
        },
        {
            field: "userResponese",
            headerName: "Utilisateur",
            width: 200,
            valueGetter: (params) => `${params.row.userResponse.prenom} ${params.row.userResponse.nom}`
        },
        {
          field: "da",
          headerName: "Date",
          width: 170,
          valueGetter: (params) => formatter.format((annonces?.find(obj => obj.id === params.row.id.idannonce))?.date)
      },
        {
            field: "statusRereservation",
            headerName: "Status",
            width: 150,
            valueGetter: (params) => ( params.row.annonceUsers.find(obj => obj.id.iduser === currentUser?.id))?.statusReservation
        }
    ]

  return (
    <Box className="p-4" >
    <Box className="w-full flex">
    <Box  className="w-full grid grid-cols-1">
      <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold"}} >Mes propositions</Typography>
      <Box className="my-3">
        <Toolbar>
        <Button variant='outlined' sx={{borderRadius:"28px", size:"medium", marginRight:"14px"}}>En cours</Button>
        <Button variant="outlined" sx={{borderRadius:"28px", size:"medium"}} >Terminé</Button>
        </Toolbar>
      </Box>
    
      {propositions && <DataGrid
                rows={propositions}
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
    </Box>
</Box>
  )
}

export default Propositions