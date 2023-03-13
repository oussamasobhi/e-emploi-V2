import React, { useState } from "react";
import User from "./User";

const UserList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("CURRENT_USER"));
  const users = [user];
  const deleteUser = () => { };
  const editUser = () => { };

  return (
    <>
      <table className="w-full bg-white border rounded-md text-sm font-roboto">
        <thead className="">
          <tr>
            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
              #
            </th>
            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
              Nom et Prenoms
            </th>
            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
              Nom d'utilisateur
            </th>
            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
              Adresse
            </th>
            <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        {users && (
          <tbody className="bg-white">
            {users?.map((user) => (
              <User
                user={user}
                key={user.id}
                deleteUser={deleteUser}
                editUser={editUser}
              />
            ))}
          </tbody>
        )}
      </table>

    </>
  );
};

export default UserList;
