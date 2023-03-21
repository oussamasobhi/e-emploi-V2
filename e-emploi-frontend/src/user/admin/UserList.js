import React, { useState, Fragment, useEffect } from "react";
import { getAllUsers } from "../../util/APIUtils";
import User from "./User";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const UserList = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
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

  const deleteUser = (e,user) => {
    e.preventDefault();
    setUser(user);
    openDelete();
  };

  const editUser = (e, user) => {
    e.preventDefault();
    setUser(user);
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
                  deleteUser={deleteUser}
                  editUser={editUser}
                  even={index % 2 === 0 ? true : false}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
      <EditUser selectedUser={user} isOpen={openEdit} refreshList={refreshList}  setIsOpen={setOpenEdit} />
      <DeleteUser open={isOpenDelete} closeModal={closeDelete} selectedUser={user}/>
    </>
  );
};

export default UserList;
