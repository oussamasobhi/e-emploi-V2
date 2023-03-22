import React from "react";

const User = ({ user, editUser, deleteUser, even }) => {
  return (
    <tr
      key={user.id}
      className={`hover:bg-blue-100 transition-colors duration-200 ease-in-out text-gray-700 ${
        even ? "bg-gray-100" : "bg-white"
      }`}
    >
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        <input type="checkbox" />
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        <div>{user.id}</div>
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        <div className="font-semibold">
          {" "}
          <span className="capitalize">{user.prenom}</span>{" "}
          <span className="capitalize">{user.nom}</span>
        </div>
        <div className="text-xs">{user.email}</div>
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        <div className="text-sm ">{user.username}</div>
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300"></td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.num_tel}
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.date_naissance}
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.cin}
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.role === "ROLE_ADMIN" && <p>Administrateur</p>}
        {user.role === "ROLE_STANDARD" && <p>Standard</p>}
      </td>
      <td className="text-right whitespace-nowrap p-3 border border-gray-300">
        {user.role !== "ROLE_ADMIN" && (
          <div className="rounded-sm bg-indigo-600 w-full">
            <button
              onClick={(e) => editUser(e, user)}
              className=" py-1 px-3 hover:cursor-pointer text-white hover:bg-indigo-700 rounded-l-sm transition-colors duration-300 ease-in-out"
            >
              Détails
            </button>
            <button
              onClick={(e) => deleteUser(e, user.id)}
              className=" py-1 px-3 hover:cursor-pointer text-white hover:bg-indigo-700 rounded-r-sm transition-colors duration-300 ease-in-out"
            >
              Supprimer
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default User;