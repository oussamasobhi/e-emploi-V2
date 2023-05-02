import React, { useState } from "react";
import SocieteAdr from "./adr/SocieteAdr";
import DeleteSociete from "./DeleteSociete";
import EditSociete from "./EditSociete";
import { Descriptions, Button, Typography } from "antd";
import AddSocieteAdr from "./adr/AddSocieteAdr";

const SocieteItem = ({ societe, notify, setCurrentUser, isCurrentUser }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const removeSociete = (e) => {
    setIsOpenDelete(true);
  };
  const updateSociete = (e) => {
    setIsOpenEdit(true);
  };
  
  return (
    <div className="px-2">
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
        {isCurrentUser && (
          <div>
            <Button onClick={(e) => updateSociete(e)} className="mr-4">
              Modifier
            </Button>
            <Button onClick={(e) => removeSociete(e)} danger className="">
              Supprimer
            </Button>
          </div>
        )}
      </Descriptions>
      <div>
        <div className="flex justify-between items-center">
          <Typography.Title level={2}>Adresses de la société</Typography.Title>
          {isCurrentUser && (
            <Button type="primary" onClick={() => setIsOpenAdd(true)}>
              Ajouter
            </Button>
          )}
        </div>

        {societe.adresses_societes?.map((address, index) => (
          <SocieteAdr
            address={address}
            notify={notify}
            refresh={setCurrentUser}
            societe={societe}
          />
        ))}
      </div>
      {isCurrentUser && (
        <>
          <DeleteSociete
            open={isOpenDelete}
            notify={notify}
            setCurrentUser={setCurrentUser}
            closeModal={() => setIsOpenDelete(false)}
            societe={societe}
          />

          <EditSociete
            open={isOpenEdit}
            notify={notify}
            setCurrentUser={setCurrentUser}
            closeModal={() => setIsOpenEdit(false)}
            societe={societe}
          />
          <AddSocieteAdr
            open={isOpenAdd}
            closeModal={() => setIsOpenAdd(false)}
            notify={notify}
            setCurrentUser={setCurrentUser}
            societe={societe}
          />
        </>
      )}
    </div>
  );
};

export default SocieteItem;
