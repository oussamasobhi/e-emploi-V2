import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getListAnnonces } from "../../util/APIUtils";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";

const Nettoyage = () => {
  const [annonces, setAnnonces] = useState(null);
  useEffect(() => {
    const loadAnnonces = async () => {
      const res = (await getListAnnonces(1,"",10000)).content;
      setAnnonces(res);
    };
    loadAnnonces();
  }, []);

  if (annonces) {
    console.log(annonces);
  };

  const nettoyageColumns = [
    {
        title: "Titre",
        dataIndex: "titre_annonce",
        key: "titre"
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description"
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
        key: "tarif_depart"
    },
    {
        title: "Date de fin",
        dataIndex: "date_fin_annonce",
        key: "date_fin"
    }
  ];

  return (
    <>
      <Typography.Title level={3}>Nettoyage</Typography.Title>
      <Table dataSource={annonces} columns={nettoyageColumns} />
    </>
  );
};

export default Nettoyage;
