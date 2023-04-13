import React from "react";
import { getListAnnonces } from "../../util/APIUtils";
import { useEffect, useState } from "react";
import {Typography, Table} from "antd";
import { Link } from "react-router-dom";

const Artisan = () => {
  const [annonces, setAnnonces] = useState(null);
  useEffect(() => {
    const loadAnnonces = async () => {
      const res = (await getListAnnonces(2,"",1000)).content;
      setAnnonces(res);
    };
    loadAnnonces();
  }, []);

  const artisanColumns = [
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
        <Link to={"/"+record.userResponse.username} >{record.userResponse.prenom} {record.userResponse.nom}</Link>
        </>
      ))
    },
    {
      title: "Tarif",
      dataIndex: "tarif_depart",
      key: "tarif_depart",
    },
    {
      title: "Date de fin",
      dataIndex: "date_fin_annonce",
      key: "date_fin",
    },
  ];

  return (
    <>
      <Typography.Title level={3}>Artisans</Typography.Title>
      <Table dataSource={annonces} columns={artisanColumns} />
    </>
  );
};

export default Artisan;
