import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../util/APIUtils";
import User from "./User";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import { Button, Table } from "antd";

const UserList = ({ notify }) => {
  const [users, setUsers] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
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
      render: ((_, record) => {
        <p>{record.lib_addre}</p>
      })
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
          <Button onClick={() => {}}>Détails</Button>
          <Button onClick={() => {}} danger className="ml-3">
            Supprimer
          </Button>
        </div>
      ),
    },
  ];
  console.log(users);
  

  return (
    <>
      <div className="overflow-x-auto flex flex-col justify-center">
        {/*<table className="bg-white rounded-md text-sm font-roboto border-collapse table-auto">
          <thead className="font-bold">
            <tr>
              <th className="text-left font-semibold capitalize tracking-wide p-3 border border-gray-300">
                <input type="checkbox" />
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 border border-gray-300">
                #
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Nom et Prenoms
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Nom d'utilisateur
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Adresse
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Téléphone
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Date de naissance
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                CIN
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Role
              </th>
              <th className="text-right font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          {users && (
            <tbody className="bg-white">
              {users?.map((user, index) => (
                <User
                key={index}
                  user={user}
                  deleteUser={(e) =>deleteUser(e,user)}
                  editUser={(e) => editUser(e,user)}
                  even={index % 2 === 0 ? true : false}
                />
              ))}
            </tbody>
          )}
        </table>*/}
        {users ? <Table dataSource={users} columns={columns} /> : ''}
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
