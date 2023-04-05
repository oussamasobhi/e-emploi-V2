import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getListAnnonces } from "../../util/APIUtils";
import { Table, Typography } from "antd";

const Nettoyage = () => {
  const [annonces, setAnnonces] = useState(null);
  useEffect(() => {
    const loadAnnonces = async () => {
      const res = (await getListAnnonces(1)).content;
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
