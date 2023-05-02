import React, { useState } from "react";
import {
  Button,
  Input,
  Typography,
  Form,
  DatePicker,
  Space,
  Upload,
  message,
} from "antd";
import { useNavigate } from "react-router";
import { getCurrentUser, updateProfil, uploadFile } from "../util/APIUtils";
import DeleteFromProfil from "./DeleteFromProfil";
import dayjs from "dayjs";
import { dateFormat } from "../constant";
import { Navigate, useParams } from "react-router";
import { UploadOutlined } from "@ant-design/icons";

const EditProfile = ({
  currentUser,
  setCurrentUser,
  setIsLoading,
  setIsAuthenticated,
  notify,
}) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(currentUser);
  const [openDelete, setOpenDelete] = useState(false);

  //setUser({ ...user, ["date_naissance"]:"" });

  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setUser({ ...user, [key]: changedValue[key] });
  };

  const reset = (e) => {
    e.preventDefault();
    navigate("/" + username);
  };
  const editProfil = async (e) => {
    try {
      await updateProfil(user);
      const _user = await getCurrentUser();
      setCurrentUser(_user);

      //notify("Notification", "Profil modifié avec succès", "success");
      message.success("Profil modifié");
      reset(e);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfil = () => {
    setOpenDelete(true);
  };

  return currentUser.username === username ? (
    <>
      <div className="flex justify-between ">
        <div className="bg-white shadow-md w-128 overflow-hidden rounded-md">
          <Typography className="font-poppins text-2xl text-gray-800 px-2 py-2 text-center bg-gray-200">
          Modifier Profil
          </Typography>

          <Form
            onValuesChange={handleChange}
            //initialValues={{ ["date_naissance"] : user.date_naissance? dayjs(user.date_naissance, dateFormat) : dayjs("0000-00-00", dateFormat)}}
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
            className="py-2"
          >
            <Space direction="vertical" style={{ width: "100%" }}>
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
                label="Date de naissance"
                name="date_naissance"
                rules={[
                  {
                    required: false,
                  },
                ]}
                initialValue={
                  user.date_naissance
                    ? dayjs(user.date_naissance, dateFormat)
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
                initialValue={user.cin}
              >
                <Input />
              </Form.Item>
              <div className="flex justify-between px-2">
                <div className="w-1/3 flex">
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
            </Space>{" "}
          </Form>
        </div>
      </div>

      <DeleteFromProfil
        open={openDelete}
        closeModal={() => setOpenDelete(false)}
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
        notify={notify}
      />
    </>
  ) : (
    <Navigate to={"/" + username} />
  );
};

export default EditProfile;
