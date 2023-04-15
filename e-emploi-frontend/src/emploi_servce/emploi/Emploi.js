import React, {useEffect, useState} from "react";
import {Typography, Table, Input, Button, InputNumber, Form, } from "antd";
import { getListAnnonces } from "../../util/APIUtils";
import { Link, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";

const Emploi = ({currentUser}) => {
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
      }else{
        let annoncesToShow = annonces.filter(function (annonce) {
          return annonce.userResponse.username === username;
        });
        setFilteredAnnonces(annoncesToShow);
      }
    }
  }, [annonces, currentUser.username, username, isProfile]);
  useEffect(() => {
    const loadAnnonces = async () => {
      const res = (await getListAnnonces(3)).content;
      setAnnonces(res);
    };
    loadAnnonces();
  }, []);

  const emploiColumns = [
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
      render: ((_,record) => (
        <>
        <Link to={"/"+record.userResponse.username} > {record.userResponse.prenom} {record.userResponse.nom}</Link>
        </>
      ))
    },
    {
      title: "Tarif",
      dataIndex: "tarif_depart",
      key: "tarif_depart",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <>
          {!isProfile && <Button type="primary">Postuler</Button>}
          {(isProfile && currentUser.username !== username ) && <Button type="primary">Postuler</Button>}
          {(isProfile && currentUser.username === username ) && (
            <>
             <Button ><EditOutlined/> </Button>
              <Button danger className="ml-3" ><DeleteOutlined/> </Button>
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
  });
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setRecherche({ ...recherche, [key]: changedValue[key] });
  };
  const onSearch = async () => {
    console.log(recherche);
    try {
      const _search = (
        await getListAnnonces(
          3,
          undefined,
          undefined,
          recherche.search,
          recherche.min,
          recherche.max
        )
      ).content;
      setAnnonces(_search);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <Typography.Title level={3}>Emplois</Typography.Title>
      <Form form={form} onValuesChange={handleChange} className="flex mb-10">
          <Form.Item name="search">
            <Input placeholder="mots clés" />
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
      <Table dataSource={filteredAnnonces} columns={emploiColumns} />
    </>
  );
};

export default Emploi;
