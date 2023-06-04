import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../util/APIUtils';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Users = ({setNbUser}) => {
    const [users, setUsers] = useState(null);
    useEffect(() => {
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
      setNbUser(users?.length);
      console.log(users);
    }, [users])
    
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'nom',
          headerName: 'Nom',
          editable: true,
        },
        {
          field: 'prenom',
          headerName: 'Prénoms',
          editable: true,
        },
        {
          field: 'num_tel',
          headerName: 'Téléphone',
          type: 'number',
          width: 180,
          editable: true,
        },
        {
            field: 'email',
            headerName: 'Adresse email',
            width: 180,
            editable: false,
          },
        {
          field: 'role',
          headerName: 'Rôle',
          sortable: false,
          width: 150,
          valueGetter: (params) =>
           params.row.role === "ROLE_STANDARD" ? `Standard` : 
                (params.row.role === "ROLE_ADMIN" ? `Administrateur` : "Prestataire")
           ,
        },
      ];
      
  return (
    <Box className="bg-slate-200 p-2 rounded-lg my-3" >
    <Typography variant="h6" sx={{fontFamily:"Poppins"}} >Gestion des utilisateurs</Typography>
    {users && <DataGrid
                rows={users}
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

export default Users