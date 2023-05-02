import React, {useState} from "react";
import { editAddress, getCurrentUser } from "../../util/APIUtils";
import { Modal, Form, Input, Button, message } from "antd";

const EditAddress = ({ open, closeModal, notify, setCurrentUser, address }) => {
  const [newAddress, setNewAddress] = useState(address);
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setNewAddress({ ...newAddress, [key]: changedValue[key] });
  };
  const reset = (e) => {
    e.preventDefault();
    setNewAddress(address);
    closeModal();
  };

  const modifierAddresse = async () => {
    try {
      await editAddress(newAddress, address.id);
      const res = await getCurrentUser();
      setCurrentUser(res);
      closeModal();
      message.success("Addresse modifié avec succès !");
    } catch (error) {
      console.log(error);
      message.error("Erreur")
    }
  };
  return (
    <Modal
      open={open}
      title="Modification d'un adresse"
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
  );
};

export default EditAddress;
