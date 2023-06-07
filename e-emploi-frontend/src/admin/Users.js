import React, { useEffect, useState } from "react";
import { activereUserById, getAllUsers, suspendreUserById } from "../util/APIUtils";
import { Box, Button, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { message } from "antd";

const Users = ({ setNbUser }) => {
  const [users, setUsers] = useState(null);
  const [isOpenSuspendre, setIsOpenSuspendre] = useState(false);
  const [isOpenActiver, setIsOpenActiver] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = (await getAllUsers()).content;
        setUsers(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();
  }, []);
  useEffect(() => {
    setNbUser(users?.length);
    console.log(users);
  }, [users]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "nom",
      headerName: "Nom",
      editable: true,
    },
    {
      field: "prenom",
      headerName: "Prénoms",
      editable: true,
    },
    {
      field: "num_tel",
      headerName: "Téléphone",
      type: "number",
      width: 180,
      editable: true,
    },
    {
      field: "email",
      headerName: "Adresse email",
      width: 180,
      editable: false,
    },
    {
      field: "role",
      headerName: "Rôle",
      sortable: false,
      width: 150,
      valueGetter: (params) =>
        params.row.role === "ROLE_STANDARD"
          ? `Standard`
          : params.row.role === "ROLE_ADMIN"
          ? `Administrateur`
          : "Prestataire",
    },
    {
      field: "status",
      headerName: "Statut",
      sortable: true,
      valueGetter: (params) => params.row.status      
    },
  ];
  const handleRowSelection = (params) => {
    setSelectedRowIds(params);
  };
  const suspendre = async () => {
    try{
      const res = await suspendreUserById(selectedRowIds[0]);
      console.log(res);
      message.info({
        content: "Utilisateur suspendu",
        className: "relative top-16"
      });
      loadUsers();
    }catch(error){
      message.error({
        content: "Suspension échouée",
        className: "relative top-16"
      })
      console.log(error);
    }
    setIsOpenSuspendre(false);
  }
  const activer = async () => {
    try{
      const res = await activereUserById(selectedRowIds[0]);
      console.log(res);
      message.info({
        content: "Utilisateur activé",
        className: "relative top-16"
      });
      loadUsers();
    }catch(error){
      message.error({
        content: "Activation échouée",
        className: "relative top-16"
      })
      console.log(error);
    }
    setIsOpenActiver(false);
  }
  const loadUsers = async () => {
    try {
      const res = (await getAllUsers()).content;
      setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };


useEffect(() => {
  console.log(selectedRowIds);
}, [selectedRowIds]);

return (
  <>
  <Box className="bg-slate-200 p-2 rounded-lg my-3">
    <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
      Gestion des utilisateurs
    </Typography>
    {users && (
      <>
        {" "}
        <DataGrid
          rows={users}
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
          className="bg-white"
        />
        {<Button onClick={()=>setIsOpenSuspendre(true)} disabled={selectedRowIds?.length!==1||(selectedRowIds?.length===1 && (users?.find(obj => obj.id === selectedRowIds[0]))?.status!=="Actif") }>suspendre</Button>}
        {<Button onClick={()=>setIsOpenActiver(true)} disabled={selectedRowIds?.length!==1||(selectedRowIds?.length===1 && (users?.find(obj => obj.id === selectedRowIds[0]))?.status!=="Suspendu") }>activer</Button>}
      </>
    )}
  </Box>
  <Modal
        open={isOpenSuspendre}
        onClose={()=>setIsOpenSuspendre(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box  sx={{position:'absolute', top:"50%", left:'50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">Suspension d'un utilisateur</h2>
            <Typography>Voulez-vous suspendre cet utilisateur?</Typography>
            <Button onClick={()=>setIsOpenSuspendre(false)}>Fermer</Button>
            <Button onClick={suspendre} >Confirmer</Button>
          </Box>
      </Modal>
      <Modal
        open={isOpenActiver}
        onClose={()=>setIsOpenActiver(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box  sx={{position:'absolute', top:"50%", left:'50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">Activation d'un utilisateur</h2>
            <Typography>Voulez-vous activer cet utilisateur?</Typography>
            <Button onClick={()=>setIsOpenActiver(false)}>Fermer</Button>
            <Button onClick={activer} >Confirmer</Button>
          </Box>
      </Modal>
  </>
);
        }
export default Users;
