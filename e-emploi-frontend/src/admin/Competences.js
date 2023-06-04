import React, { useEffect, useState } from 'react'
import { getAllSousCatagorie, getAllcompetences } from '../util/APIUtils';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Competences = ({setNbCompetences}) => {
    const [competences, setCompetences] = useState(null);
    useEffect(() => {
      const loadSousCategories = async () => {
        try{
            const res = await getAllSousCatagorie();
            setCompetences(res);
        }catch(error){
            console.log(error)
        }
    }
    loadSousCategories();
    }, [])
    useEffect(() => {
      setNbCompetences(competences?.length);
    }, [competences])
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
          field: 'nom_sous_categorie',
          headerName: 'Libellé',
          width: 200,
          editable: true,
        },
        {
          field: 'user',
          headerName: "Prestataires",
          valueGetter: (params) => params.row.users?.length
    }
      ];
  return (
    <Box className="bg-slate-200 p-2 rounded-lg my-3" >
    <Typography variant="h6" sx={{fontFamily:"Poppins"}} >Gestion des compétences</Typography>
    {competences && <DataGrid
                rows={competences}
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

export default Competences