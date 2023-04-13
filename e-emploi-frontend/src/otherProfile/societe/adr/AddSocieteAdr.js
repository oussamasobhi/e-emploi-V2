import React, { useState } from "react";
import { Input, Form, Modal, Button } from "antd";
import { newASocieteAddress } from "../../../util/APIUtils";
import { getCurrentUser } from "../../../util/APIUtils";

const AddSocieteAdr = ({ open, closeModal, societe, setCurrentUser, notify }) => {
    const [newAddress, setNewAddress] = useState({
        libelle_adr: "",
        pays: "",
        ville: "",
      });
      const reset = () => {
        setNewAddress({
          libelle_adr: "",
          pays: "",
          ville: "",
        });
        closeModal();
      };
      const handleChange = (changedValue, allValues) => {
        const key = Object.keys(changedValue)[0];
        setNewAddress({ ...newAddress, [key]: changedValue[key] });
      };
      const ajouterAddresse = async () => {
        try{
            await newASocieteAddress(societe.id, newAddress);
            const _user = await getCurrentUser();
            setCurrentUser(_user);
            closeModal();
            notify("Notification", "Adresse ajouté avec succès !", "info");
        }catch(error){
            console.log(error);
        }
      };
  return (
    <Modal
      title="Ajout d'adresse"
      open={open}
      footer={[
        <Button type="primary" onClick={ajouterAddresse}>
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
  )
}

export default AddSocieteAdr