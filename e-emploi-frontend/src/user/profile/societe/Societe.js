import React, { useState } from "react";
import DeleteSociete from "./DeleteSociete";
import EditSociete from "./EditSociete";
import { Button, Descriptions, Typography } from "antd";
import SocieteAdr from "./adresse/SocieteAdr";
import AddSocieteAdr from "./adresse/AddSocieteAdr";

const Societe = ({ societe, notify, setCurrentUser }) => {
  const [isOpenDeleteSociete, setIsOpenDeleteSociete] = useState(false);
  const [isOpenEditSociete, setIsOpenEditSociete] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  function openDeleteSociete() {
    setIsOpenDeleteSociete(true);
  }
  function closeDeleteSociete() {
    setIsOpenDeleteSociete(false);
  }
  function openEditSociete() {
    setIsOpenEditSociete(true);
  }
  function closeEditSociete() {
    setIsOpenEditSociete(false);
  }
  const updateSociete = (e) => {
    e.preventDefault();
    openEditSociete();
  };

  const removeSociete = (e) => {
    e.preventDefault();
    openDeleteSociete();
  };

  return (
    <>
      <Descriptions title={societe.nom_societe} className="mt-4">
        <Descriptions.Item label="Téléphone">
          {societe.num_tel}
        </Descriptions.Item>
        <Descriptions.Item label="Site web">
          {societe.siteweb}
        </Descriptions.Item>
        <Descriptions.Item label="Numéro patente">
          {societe.num_patente}
        </Descriptions.Item>
        <div>
          <Button onClick={(e) => updateSociete(e, societe)} className="mr-4">
            Modifier
          </Button>
          <Button
            onClick={(e) => removeSociete(e, societe)}
            danger
            className=""
          >
            Supprimer
          </Button>
        </div>
      </Descriptions>
      <div>
        <div className="flex justify-between items-center">
        <Typography.Title level={2}>Adresses de la société</Typography.Title>
        <Button type="primary" onClick={()=>setIsOpenAdd(true)} >Ajouter</Button>
        </div>
        
        {societe.adresses_societes?.map((address, index) => (
          <SocieteAdr address={address} notify={notify} refresh={setCurrentUser} societe={societe} />
        ))}
      </div>
      <DeleteSociete
        open={isOpenDeleteSociete}
        notify={notify}
        setCurrentUser={setCurrentUser}
        closeModal={closeDeleteSociete}
        societe={societe}
      />
      <EditSociete
        open={isOpenEditSociete}
        notify={notify}
        setCurrentUser={setCurrentUser}
        closeModal={closeEditSociete}
        societe={societe}
      />
      <AddSocieteAdr open={isOpenAdd} closeModal={()=>setIsOpenAdd(false)}
      notify={notify}
      setCurrentUser={setCurrentUser}
      societe={societe} />
    </>
  );
};

export default Societe;
