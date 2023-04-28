import {
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  Button,
  Radio,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import {
  createAnnonce,
  getCategories,
  getSousCategories,
} from "../util/APIUtils";
import { useNavigate } from "react-router";
import { useForm } from "antd/es/form/Form";

const CreateAnnonce = ({ notify }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [categories1, setCategories1] = useState(null);
  const [categories2, setCategories2] = useState(null);
  const [annonce, setAnnonce] = useState({
    titre_annonce: "",
    description: "",
    tarif_depart: "",
    tarif_final: "",
    date_fin_annonce: "",
    id_categorieAnnonce: "",
    id_categorie2Annonce: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      const _cat = await getCategories();
      setCategories(_cat);
      const _souscat1 = await getSousCategories(1);
      setCategories1(_souscat1);
      const _souscat2 = await getSousCategories(2);
      setCategories2(_souscat2);
    };
    loadCategories();
  }, []);

  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setAnnonce({ ...annonce, [key]: changedValue[key] });
  };
  const creerAnnonce = async () => {
    try {
      await createAnnonce(annonce);
      navigate("/annonce");
      //notify("Notification", "Annonce créée ", "info");
      message.success("Annonce créée avec succès");
    } catch (error) {
      message.error("Erreur");
      console.log(error);
    }
  };
  const [form] = useForm();

  return (
    <div className="w-auto">
      <div className="mx-auto px-auto bg-gray-100 flex flex-col items-center justify-center">
      <Typography className="text-3xl text-center font-caption py-2 font-bold">Créer une annonce</Typography>
        <Form
          className="flex-none w-88 bg-white py-6 rounded-lg shadow-lg px-4"
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
            width: 500
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
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item label="Tarif" name="tarif_depart">
            <InputNumber className="w-full" />
          </Form.Item>
          
          <Form.Item label="Catégorie" name="id_categorieAnnonce">
            <Select className="w-full">
              {categories?.map((categorie, index) => (
                <Select.Option key={categorie.id} value={categorie.id}>
                  {categorie.nom_categorie}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {(annonce.id_categorieAnnonce === 1 ||
            annonce.id_categorieAnnonce === 2) && (
            <Form.Item label="Sous catégorie">
              {annonce.id_categorieAnnonce === 1 && (
                <>
                  <Radio.Group
                    onChange={(e) => {
                      setAnnonce({
                        ...annonce,
                        ["id_categorie2Annonce"]: e.target.value,
                      });
                    }}
                  >
                    {categories1?.map((souscat, index) => (
                      <Radio key={index} value={souscat.id}>
                        {souscat.nom_sous_categorie}
                      </Radio>
                    ))}
                  </Radio.Group>
                </>
              )}
              {annonce.id_categorieAnnonce === 2 && (
                <>
                  <Radio.Group
                    onChange={(e) => {
                      setAnnonce({
                        ...annonce,
                        ["id_categorie2Annonce"]: e.target.value,
                      });
                    }}
                  >
                    {categories2?.map((souscat, index) => (
                      <Radio key={index} value={souscat.id}>
                        {souscat.nom_sous_categorie}
                      </Radio>
                    ))}
                  </Radio.Group>
                </>
              )}
            </Form.Item>
          )}
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" onClick={creerAnnonce}>
              Ajouter
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateAnnonce;
