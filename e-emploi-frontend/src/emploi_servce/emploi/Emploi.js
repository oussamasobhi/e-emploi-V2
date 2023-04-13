import React, {useEffect, useState} from "react";
import {Typography, Table} from "antd";
import { getListAnnonces } from "../../util/APIUtils";
import { Link } from "react-router-dom";

const Emploi = () => {
  const [annonces, setAnnonces] = useState(null);
  useEffect(() => {
    const loadAnnonces = async () => {
      const res = (await getListAnnonces(3, "",10000)).content;
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
        <Link to={"/"+record.userResponse.username} >{record.userResponse.nom}</Link>
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
      <Typography.Title level={3}>Emplois</Typography.Title>
      <Table dataSource={annonces} columns={emploiColumns} />
    </>
  );
};

export default Emploi;
