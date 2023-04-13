import { Modal, Typography } from "antd";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import {
  deleteSocieteAdress,
  getCurrentUser,
  updateSocieteAdress,
} from "../../../util/APIUtils";

const SocieteAdr = ({ address, notify, refresh, isCurrentUser }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [newAddress, setNewAddress] = useState(address);
  const openEdit = () => {
    setIsOpenEdit(true);
  };
  const openRemove = () => {
    setIsOpenDelete(true);
  };

  const modifierAddresse = async () => {
    try {
      await updateSocieteAdress(address.id, newAddress);
      const _user = await getCurrentUser();
      refresh(_user);
      setIsOpenEdit(false);
      notify("Notification", "Adresse modifié avec succès", "info");
    } catch (error) {
      console.log(error);
    }
  };
  const reset = () => {
    setNewAddress(address);
    setIsOpenEdit(false);
  };
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setNewAddress({ ...newAddress, [key]: changedValue[key] });
  };
  const supprimerAdresse = async () => {
    try {
      await deleteSocieteAdress(address.id);
      const _user = await getCurrentUser();
      refresh(_user);
      setIsOpenDelete(false);
      notify("Notification", "Adresse supprimé avec succès", "info");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex-auto flex flex-col">
          <Typography.Title level={3}>{address.libelle_adr}</Typography.Title>
          <Typography.Text className="text-lg">
            {address.ville}, {address.pays}
          </Typography.Text>
        </div>
        {isCurrentUser && (
          <>
            <Button onClick={openEdit}>Modifier</Button>
            <Button onClick={openRemove} danger className="ml-10">
              Supprimer
            </Button>
          </>
        )}
      </div>
      {isCurrentUser && (
        <>
          <Modal
            title="Modification de l'adresse"
            open={isOpenEdit}
            footer={[
              <Button type="primary" onClick={modifierAddresse}>
                Enregistrer
              </Button>,
              <Button onClick={reset}>Fermer</Button>,
            ]}
          >
            <Form onValuesChange={handleChange}>
              <div className="mt-2">
                <Form.Item
                  label="Rue"
                  name="lib_addre"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  initialValue={newAddress.libelle_adr}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ville"
                  name="ville"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  initialValue={newAddress.ville}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Pays"
                  name="pays"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  initialValue={newAddress.pays}
                >
                  <Input />
                </Form.Item>
              </div>
            </Form>
          </Modal>
          <Modal
            title="Suppression de compétence"
            open={isOpenDelete}
            onOk={supprimerAdresse}
            onCancel={() => setIsOpenDelete(false)}
            okText="Supprimer"
            cancelText="Annuler"
          >
            <p>Voulez-vous supprimer lcet adresse ?</p>
          </Modal>
        </>
      )}
    </>
  );
};

export default SocieteAdr;
