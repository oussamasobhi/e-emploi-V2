import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { createAnnonce, getCategories } from "../util/APIUtils";
import { useNavigate } from "react-router";
import { useForm } from "antd/es/form/Form";

const CreateAnnonce = ({ notify }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [categories2, setCategories2] = useState([
    {
      id: 1,
      label: "Service nettoyage",
    },
    {
      id: 2,
      label: "Service artisan",
    },
    {
      id: 3,
      label: "Offres d'emploi",
    },
    {
      id: 4,
      label: "Services",
    },
  ]);
  const [annonce, setAnnonce] = useState({
    titre_annonce: "",
    description: "",
    tarif_depart: "",
    tarif_final: "",
    date_fin_annonce: "",
    id_categorie2Annonce: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      const _cat = await getCategories();
      setCategories(_cat);
    };
    loadCategories();
  }, []);
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setAnnonce({ ...annonce, [key]: changedValue[key] });
  };
  const creerAnnonce = async () => {
    try {
      //await form.validateFields();
      await createAnnonce(annonce);
      navigate("/");
      notify("Notification", "Annonce créée ", "info");
    } catch (error) {
        notify("Notification", "Invalid", "error");
      console.log(error);
    }
  };
  const [form] = useForm();

  return (
    <>
      <div className="mx-20 bg-white">
        <Typography.Title level={3} className="text-center">
          Créer une annonce
        </Typography.Title>
        <Form
          form={form}
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
            label="Titre"
            name="titre_annonce"
            rules={[
              {
                required: true,
                message: "champ obligatoire !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "champ obligatoire !",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item label="Tarif de départ" name="tarif_depart">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Tarif final" name="tarif_final">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Date de fin de l'annonce" name="date_fin_annonce">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Categorie" name="id_categorie2Annonce">
            <Select>
              {categories2?.map((categorie, index) => (
                <Select.Option key={categorie.id} value={categorie.id}>
                  {categorie.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" onClick={creerAnnonce}>
              Ajouter
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateAnnonce;
