import React from "react";
import { useState, useEffect } from "react";
import { getListAnnonces } from "../util/APIUtils";
import { Typography, Table } from "antd";
import { Link } from "react-router-dom";

const DomicileContent = ({ currentUser }) => {
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
      const res1 = (await getListAnnonces(1)).content;
      const res2 = (await getListAnnonces(2)).content;
      setAnnonces(res1.concat(res2));
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
      <Typography.Title level={3}>Domicile</Typography.Title>
      <Table dataSource={filteredAnnonces} columns={nettoyageColumns} />
    </>
  );
};

export default DomicileContent;
