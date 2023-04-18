import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getListAnnonces } from "../../util/APIUtils";
import {
  Typography,
  Table,
  Input,
  Button,
  InputNumber,
  Form,
  Tag,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const Annonce = ({ currentUser }) => {
  const [annonces, setAnnonces] = useState(null);
  const [filteredAnnonces, setFilteredAnnonces] = useState(null);
  const { username } = useParams();
  const [isProfile, setIsProfile] = useState(false);
  useEffect(() => {
    if (username) {
      setIsProfile(true);
    }
  }, [username]);

  useEffect(() => {
    if (annonces) {
      if (!isProfile) {
        let annoncesToShow = annonces.filter(function (annonce) {
          return annonce.userResponse.username !== currentUser.username;
        });
        setFilteredAnnonces(annoncesToShow);
      } else {
        let annoncesToShow = annonces.filter(function (annonce) {
          return annonce.userResponse.username === username;
        });
        setFilteredAnnonces(annoncesToShow);
      }
    }
  }, [annonces, currentUser.username, username, isProfile]);

  useEffect(() => {
    const loadAnnonces = async () => {
      const res1 = (await getListAnnonces(1)).content;
      const res2 = (await getListAnnonces(2)).content;
      const res3 = (await getListAnnonces(3)).content;
      const res4 = (await getListAnnonces(4)).content;
      setAnnonces(res1.concat(res2).concat(res3).concat(res4));
    };
    loadAnnonces();
  }, []);

  const nettoyageColumns = [
    {
      title: "Titre",
      dataIndex: "titre_annonce",
      key: "titre",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Utilisateur",
      dataIndex: "userResponse",
      key: "utilisateur",
      render: (_, record) => (
        <>
          <Link to={"/" + record.userResponse.username}>
            {" "}
            {record.userResponse.prenom} {record.userResponse.nom}
          </Link>
        </>
      ),
    },
    {
      title: "Tarif",
      dataIndex: "tarif_depart",
      key: "tarif_depart",
    },
    {
      title: "Catégorie",
      dataIndex: "categorie2Annonce",
      key: "souscategorie",
      render: (_, record) => (
        <Tag color="green">{record.categorie2Annonce}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <>
          {!isProfile && <Button type="primary">Postuler</Button>}
          {isProfile && currentUser.username !== username && (
            <Button type="primary">Postuler</Button>
          )}
          {isProfile && currentUser.username === username && (
            <>
              <Button>
                <EditOutlined />{" "}
              </Button>
              <Button danger className="ml-3">
                <DeleteOutlined />{" "}
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  //recherche
  const [form] = useForm();
  const [recherche, setRecherche] = useState({
    search: "",
    min: undefined,
    max: undefined,
    categorie: null,
  });
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setRecherche({ ...recherche, [key]: changedValue[key] });
  };
  const onSearch = async () => {
    try {
      if (recherche.categorie) {
        const res = (
          await getListAnnonces(
            recherche.categorie,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        setAnnonces(res);
      } else {
        const res1 = (
          await getListAnnonces(
            1,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        const res2 = (
          await getListAnnonces(
            2,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        const res3 = (
          await getListAnnonces(
            3,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        const res4 = (
          await getListAnnonces(
            4,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        setAnnonces(res1.concat(res2).concat(res3).concat(res4));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const categories = [
    {
      id: 1,
      nom_categorie: "Nettoyage",
    },
    {
      id: 2,
      nom_categorie: "Artisan",
    },
    {
      id: 3,
      nom_categorie: "Emploi",
    },
    {
      id: 4,
      nom_categorie: "Service",
    },
  ];
  return (
    <>
      <Typography.Title level={3}>Annonces</Typography.Title>
      <Form form={form} onValuesChange={handleChange} className="flex mb-10">
        <Form.Item name="search">
          <Input placeholder="mots clés" />
        </Form.Item>
        <Form.Item label="Catégorie" name="categorie">
          <Select>
            {categories?.map((categorie, index) => (
              <Select.Option key={index} value={categorie.id}>
                {categorie.nom_categorie}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Tarif min" name="min" className="ml-3">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Tarif max" name="max" className="ml-3">
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="ml-6"
            onClick={onSearch}
          >
            <SearchOutlined />
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={filteredAnnonces} columns={nettoyageColumns} />
    </>
  );
};

export default Annonce;
