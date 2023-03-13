import React from "react";

const User = ({ user, editUser, deleteUser }) => {
  return (
    <tr key={user.id} className="hover:bg-blue-50">
      <td className="text-left px-6 py-2 whitespace-nowrap">
        <div>{user.id}</div>
      </td>
      <td className="text-left px-6 py-2 flex flex-col">
        <div className="font-bold">{user.prenom+" "+user.nom}</div>
        <div className="">{user.email}</div>
      </td>
      <td className="text-left px-6 py-2 whitespace-nowrap">
        <div className="text-sm ">{user.username}</div>
      </td>
      <td className="text-left px-6 py-2 whitespace-nowrap"></td>
      <td className="text-right px-6 py-2 whitespace-nowrap">
        <a
          href="#"
          onClick={(e) => editUser(e, user.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4"
        >
          Details
        </a>
        <a
          href="#"
          onClick={(e) => deleteUser(e, user.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
        >
          Supprimer
        </a>
      </td>
    </tr>
  );
};

export default User;
