import React, { useState } from "react";
import { Button, Input, Typography, Form } from "antd";
import { useNavigate } from "react-router";
import { getCurrentUser, updateProfil } from "../../util/APIUtils";
import DeleteFromProfil from "./DeleteFromProfil";

const UpdateProfil = ({
  currentUser,
  setCurrentUser,
  setIsLoading,
  setIsAuthenticated,
  notify,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(currentUser);
  const [openDelete, setOpenDelete] = useState(false);
  const openDeleteAlert = () => {
    setOpenDelete(true);
  };
  const closeDeleteAlert = () => {
    setOpenDelete(false);
  };

  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setUser({ ...user, [key]: changedValue[key] });
  };

  const reset = (e) => {
    e.preventDefault();
    navigate("/profile");
  };
  const editProfil = async (e) => {
    try {
      await updateProfil(user);
      const _user = await getCurrentUser();
      setCurrentUser(_user);
      reset(e);
      notify("Notification", "Profil modifié avec succès", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfil = () => {
    openDeleteAlert();
  };

  return (
    <>
      <Typography.Title level={3} className="uppercase text-center">
        Modification de vos informations
      </Typography.Title>

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
        onFinish={editProfil}
      >
        <Form.Item
          label="Nom"
          name="nom"
          rules={[
            {
              required: true,
              message: "S'il vous plaît, entrer votre nom!",
            },
          ]}
          initialValue={user.nom}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Préom"
          name="prenom"
          rules={[
            {
              required: true,
              message: "S'il vous plaît, entrer votre prénom!",
            },
          ]}
          initialValue={user.prenom}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nom d'utilisateur"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={user.username}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={user.email}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Téléphone"
          name="num_tel"
          rules={[
            {
              required: false,
            },
          ]}
          initialValue={user.num_tel}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CIN"
          name="cin"
          rules={[
            {
              required: false,
            },
          ]}
          initialValue={user.cin}
        >
          <Input />
        </Form.Item>
        <div className="flex justify-between max-w-5/6">
          <div className="w-1/3 flex justify-around">
            <Button type="primary" onClick={editProfil} className="mr-4">
              Enregistrer
            </Button>
            <Button onClick={reset}>Annuler</Button>
          </div>
          {!(currentUser.role === "ROLE_ADMIN") && (
            <div className="">
              <Button onClick={deleteProfil} type="link" danger>
                Supprimer votre compte
              </Button>
            </div>
          )}
        </div>
      </Form>
      <DeleteFromProfil
        open={openDelete}
        closeModal={closeDeleteAlert}
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
        notify={notify}
      />
    </>
  );
};

export default UpdateProfil;
