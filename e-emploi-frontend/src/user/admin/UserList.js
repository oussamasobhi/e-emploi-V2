import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../util/APIUtils";
import DetailsUser from "./DetailsUser";
import { Table, Tag } from "antd";
import { initialUser } from "../../constant";
import dayjs from "dayjs";

const UserList = ({ notify }) => {
  const [users, setUsers] = useState(null);
  const [userToEdit, setUserToEdit] = useState(initialUser);
  const [openEdit, setOpenEdit] = useState(false);

  const refreshList = async () => {
    const res = (await getAllUsers()).content;
    const sortedRes = res.sort((a, b) => a.id - b.id);
    setUsers(sortedRes);
  };

  useEffect(() => {
    const fillUserList = async () => {
      const res = (await getAllUsers()).content;
      const sortedRes = res.sort((a, b) => a.id - b.id);
      //const sortedRes = (res).sort((a, b) => b.attr.localeCompare(a.attr));
      setUsers(sortedRes);
    };
    fillUserList();
  }, []);

  const detailsUser = (e, user) => {
    e.preventDefault();
    setUserToEdit(user);
    setOpenEdit(true);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prénoms",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Date de naissance",
      dataIndex: "date_naissance",
      key: "date_naissance",
      render: (_, record) => (
        <>
          {record.date_naissance
            ? dayjs(record.date_naissance).format("YYYY-MM-DD")
            : ""}
        </>
      ),
    },
    {
      title: "Adresses",
      dataIndex: "adresses",
      key: "adresses",
      render: (_, record) => (
        <>
          {record.adresses?.map((adr) => (
            <>
              <p className="text-sm leading-3">
                {adr.libelle_adr} ({adr.pays}, {adr.ville})
              </p>
            </>
          ))}
        </>
      ),
    },
    {
      title: "Téléphone",
      dataIndex: "num_tel",
      key: "telephone",
    },
    {
      title: "CIN",
      dataIndex: "cin",
      key: "cin",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <>
        {record.role==="ROLE_ADMIN" && <Tag color="#ff0000">Administrateur</Tag> }
        {record.role==="ROLE_STANDARD" && <Tag color="#00aa00">Standard</Tag> }
        {record.role==="ROLE_CONDIDAT" && <Tag color="#ffff00">Candidat</Tag> }
        {record.role==="ROLE_Pro" && <Tag color="#000088">Professionnel</Tag> }
        </>
      )
    },
  ];

  return (
    <>
      <div className="overflow-x-auto flex flex-col justify-center">
        {users ? (
          <Table
            dataSource={users}
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => detailsUser(event, record),
              };
            }}
          />
        ) : (
          ""
        )}
      </div>
      <DetailsUser
        selectedUser={userToEdit}
        setSelectedUser={setUserToEdit}
        isOpen={openEdit}
        refreshList={refreshList}
        setIsOpen={setOpenEdit}
        notify={notify}
      />
    </>
  );
};

export default UserList;
