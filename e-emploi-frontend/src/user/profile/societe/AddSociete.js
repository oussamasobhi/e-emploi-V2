import React, { useState } from "react";
import { Form, Button,  Modal, Input } from "antd";
import { addSociete, getCurrentUser } from "../../../util/APIUtils";

const AddSociete = ({ open, closeModal, setCurrentUser, notify }) => {
  const [societe, setSociete] = useState({
    nom_societe: "",
    num_tel: "",
    siteweb: "",
    num_patente: "",
  });

  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setSociete({ ...societe, [key]: changedValue[key] });
  };

  const reset = (e) => {
    e.preventDefault();
    setSociete({
      nom_societe: "",
      num_tel: "",
      siteweb: "",
      num_patente: "",
    });
    closeModal();
  };
  const ajouterSociete = async (e) => {
    e.preventDefault();
    try {
      await addSociete(societe);
      const _user = await getCurrentUser();
      setCurrentUser(_user);
      reset(e);
      notify("Notification", "Société ajoutée avec succès !", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        title="Ajout de la société"
        footer={[
          <Button type="primary" onClick={ajouterSociete}>
            Enregistrer
          </Button>,
          <Button onClick={reset}>Fermer</Button>,
        ]}
      >
        <Form
          onValuesChange={handleChange}
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Nom de la société"
            name="nom_societe"
            rules={[
              {
                required: true,
                message: "S'il vous plaît, entrer le nom de la société",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Téléphone"
            name="num_tel"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Site web"
            name="siteweb"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Numéro patente"
            name="num_patente"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSociete;
