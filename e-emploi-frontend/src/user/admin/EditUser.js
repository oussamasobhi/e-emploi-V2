import React, { useEffect, useState } from "react";
import { updateUser, getUserByUsername } from "../../util/APIUtils";
import { Input, Form, DatePicker, Button, Modal } from "antd";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

const EditUser = ({ selectedUser, refreshList, setIsOpen, isOpen, notify }) => {
  const [newUser, setNewUser] = useState(selectedUser);
  
  useEffect(() => {
   const getSelectedUser = async () => {
    try{
      const _user = await getUserByUsername(selectedUser.username);
      setNewUser(_user);
    }catch(error){
      console.log(error);
    }   
    getSelectedUser();
   }
  }, [])
  

  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setNewUser({ ...newUser, [key]: changedValue[key] });
  };
  const reset = (e) => {
    e.preventDefault();
    setNewUser(selectedUser);
    refreshList();
    setIsOpen(false);
  };

  const editUser = async () => {
    try {
      await updateUser(selectedUser.username, newUser);
      reset();
      notify("Notification", "Utilisateur modifié avec succès", "success");
    } catch (error) {
      console.log(error);
      notify("Notification", "Echec de modification", "error");
    }
  };

  return (
    <Modal
      open={isOpen}
      title="Détails de l'utilisateur"
      footer={[
        <Button type="primary" onClick={editUser}>
          Enregistrer
        </Button>,
        <Button onClick={reset}>Fermer</Button>,
      ]}
    >
      <Form onValuesChange={handleChange}>
        <div className="mt-2">
          <Form.Item
            label="Nom"
            name="nom"
            rules={[
              {
                required: true,
                message: "Champ obligatoire !",
              },
            ]}
            initialValue={newUser.nom}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Prénom"
            name="prenom"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={newUser.prenom}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nom d'utilisateur"
            name="username"
            rules={[
              {
                required: true,
                message: "Champ obligatoire !",
              },
            ]}
            initialValue={newUser.username}
            
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Champ obligatoire !",
              },
            ]}
            
            initialValue={newUser.email}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Date de naissance"
            name="date_naissance"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={
              newUser.date_naissance
                ? dayjs(newUser.date_naissance, dateFormat)
                : ""
            }
          >
            <DatePicker format={dateFormat} className="w-full" />
          </Form.Item>
          <Form.Item
            label="CIN"
            name="cin"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={newUser.cin}
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
            initialValue={newUser.num_tel}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditUser;
