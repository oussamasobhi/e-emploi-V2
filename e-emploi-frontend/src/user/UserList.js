import React, { useState, Fragment, useEffect } from "react";
import { getAllUsers } from "../util/APIUtils";
import User from "./User";
import EditUser from "./EditUser";

const UserList = () => {
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState(null);
  const [responseUser, setResponseUser] = useState(null);
  

  useEffect(() => {
    const fillUserList = async () => {
      const res = (await getAllUsers()).content;
      const sortedRes = res.sort((a, b) => a.id - b.id);
      //const sortedRes = (res).sort((a, b) => b.attr.localeCompare(a.attr));
      setUsers(sortedRes);
    };
    fillUserList();
  }, [responseUser]);

  const deleteUser = () => {};

  const editUser = (e, user) => {
    e.preventDefault();
    setUsername(user.username);
  };

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
      <EditUser setResponseUser={setResponseUser} username={username} />
    </>
  );
};

export default UserList;
