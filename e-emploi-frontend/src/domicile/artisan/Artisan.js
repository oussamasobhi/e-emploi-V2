import React from "react";
import { getListAnnonces } from "../../util/APIUtils";
import { useEffect, useState } from "react";
import {Typography, Table} from "antd";
import { Link } from "react-router-dom";

const Artisan = () => {
  const [annonces, setAnnonces] = useState(null);
  useEffect(() => {
    const loadAnnonces = async () => {
      const res = (await getListAnnonces(2)).content;
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
      title: "Utilisateur",
      dataIndex: "userResponse",
      key: "user",
      render : (_, record) => (
        <>
          {record.userResponse && (
            <Link to="#">
              {record.userResponse.nom}
            </Link>
          )}
        </>
      )
    }
  ];

  return (
    <>
      <Typography.Title level={3}>Artisans</Typography.Title>
      <Table dataSource={annonces} columns={artisanColumns} />
    </>
  );
};

export default Artisan;
