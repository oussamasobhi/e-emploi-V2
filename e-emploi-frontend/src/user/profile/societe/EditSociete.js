import { useState } from "react";
import { updateSociete, getCurrentUser } from "../../../util/APIUtils";
import {Form, Input, Button, Modal} from "antd";

const EditSociete = ({ open, closeModal, notify, setCurrentUser, societe }) => {
  const [newSociete, setNewSociete] = useState(societe);
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setNewSociete({ ...newSociete, [key]: changedValue[key] });
  };

  const reset = (e) => {
    e.preventDefault();
    setNewSociete(societe);
    closeModal();
  };

  const modifierSociete = async (e) => {
    try {
      await updateSociete(societe.id, newSociete);
      const _user = await getCurrentUser();
      setCurrentUser(_user);
      reset(e);
      notify("Notification", "Société modifiée avec succès !", "info");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      title="Ajout de la société"
      footer={[
        <Button type="primary" onClick={modifierSociete}>
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
          initialValue={newSociete.nom_societe}
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
          initialValue={newSociete.num_tel}
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
          initialValue={newSociete.siteweb}          
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
          initialValue={newSociete.num_patente}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSociete;
