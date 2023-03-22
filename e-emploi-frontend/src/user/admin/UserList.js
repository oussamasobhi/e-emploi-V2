import React, { useState, Fragment, useEffect } from "react";
import { getAllUsers } from "../../util/APIUtils";
import User from "./User";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const UserList = ({notify}) => {
  const [users, setUsers] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  
  const refreshList = async () => {
    const res = (await getAllUsers()).content;
    const sortedRes = res.sort((a, b) => a.id - b.id);
    setUsers(sortedRes);
  }
  

  useEffect(() => {
    const fillUserList = async () => {
      const res = (await getAllUsers()).content;
      const sortedRes = res.sort((a, b) => a.id - b.id);
      //const sortedRes = (res).sort((a, b) => b.attr.localeCompare(a.attr));
      setUsers(sortedRes);
    };
    fillUserList();
  }, []);

  const deleteUser = (e,user1) => {
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
  
  function closeDelete () {
    setIsOpenDelete(false);
  }
  function openDelete(){
    setIsOpenDelete(true);
  }

  return (
    <>
      <div className="overflow-x-auto flex justify-center">
        <table className="bg-white rounded-md text-sm font-roboto border-collapse table-auto">
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
                  user={user}
                  key={user.id}
                  deleteUser={(e) =>deleteUser(e,user)}
                  editUser={(e) => editUser(e,user)}
                  even={index % 2 === 0 ? true : false}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
      <EditUser selectedUser={userToEdit} isOpen={openEdit} refreshList={refreshList}  setIsOpen={setOpenEdit} notify={notify}/>
      <DeleteUser userToDelete={userToDelete} isOpen={isOpenDelete} refreshList={refreshList}  setIsOpen={setIsOpenDelete} notify={notify}/>
    </>
  );
};

export default UserList;
