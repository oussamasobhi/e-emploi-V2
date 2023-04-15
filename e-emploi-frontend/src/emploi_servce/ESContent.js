import React, { useEffect, useState } from "react";
import { Typography, Table } from "antd";
import { getListAnnonces } from "../util/APIUtils";
import { Link } from "react-router-dom";

const ESContent = ({currentUser}) => {
  const [annonces, setAnnonces] = useState(null);
  const [filteredAnnonces, setFilteredAnnonces] = useState(null);
  useEffect(() => {
    if (annonces) {
      var annoncesToShow = annonces.filter(function (annonce) {
        return annonce.userResponse.username !== currentUser.username;
      });
      setFilteredAnnonces(annoncesToShow);
    }
  }, [annonces, currentUser.username]);
  useEffect(() => {
    const loadAnnonces = async () => {
      const res = (await getListAnnonces(3,"",10000)).content;
      const res1 = (await getListAnnonces(4,"",1000)).content;
      setAnnonces(res.concat(res1));
    };
    loadAnnonces();
  }, []);

  const empServColumns = [
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
      title: "Date de fin",
      dataIndex: "date_fin_annonce",
      key: "date_fin",
    },
    {
      title: "Catégorie",
      dataIndex: "categorie2Annonce",
      key: "categorie2",
    },
  ];

  return (
    <>
      <Typography.Title level={3}>Emplois</Typography.Title>
      <Table dataSource={filteredAnnonces} columns={empServColumns} />
    </>
  );
};

export default ESContent;
