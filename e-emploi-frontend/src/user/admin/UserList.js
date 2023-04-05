import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../util/APIUtils";
import User from "./User";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import { Button, Table } from "antd";
import { initialUser } from "../../constant";
import { dayjs } from "dayjs";

const UserList = ({ notify }) => {
  const [users, setUsers] = useState(null);
  const [userToEdit, setUserToEdit] = useState(initialUser);
  const [userToDelete, setUserToDelete] = useState(initialUser);
  const [openEdit, setOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

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

  const deleteUser = (e, user1) => {
    e.preventDefault();
    setUserToDelete(user1);
    console.log(userToDelete);
    setIsOpenDelete(true);
  };

  const editUser = (e, user) => {
    e.preventDefault();
    setUserToEdit(user);
    setOpenEdit(true);
  };

  function closeDelete() {
    setIsOpenDelete(false);
  }
  function openDelete() {
    setIsOpenDelete(true);
  }

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
    },
    {
      title: "Adresses",
      dataIndex: "adresses",
      key: "adresses",
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
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: () => (
        <div>
          {/*<Button onClick={() => {}}>Détails</Button>*/}
          <Button onClick={() => {}} danger className="ml-3">
            Supprimer
          </Button>
        </div>
      ),
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
                onClick: (event) => {
                  editUser(event, record);
                },
              };
            }}
          />
        ) : (
          ""
        )}
      </div>
      <EditUser
        selectedUser={userToEdit}
        isOpen={openEdit}
        refreshList={refreshList}
        setIsOpen={setOpenEdit}
        notify={notify}
      />
      <DeleteUser
        userToDelete={userToDelete}
        isOpen={isOpenDelete}
        refreshList={refreshList}
        setIsOpen={setIsOpenDelete}
        notify={notify}
      />
    </>
  );
};

export default UserList;
