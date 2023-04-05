import { Button, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";

const User = ({ user, editUser, deleteUser, even }) => {
  return (
    <tr
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
          <span className="capitalize">{user.prenom}</span>{" "}
          <span className="capitalize">{user.nom}</span>
        </div>
        <div className="text-xs">{user.email}</div>
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        <div className="text-sm ">{user.username}</div>
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.adresses?.map((adresse) => (
          <div className="flex flex-col">
            <Typography.Text className="text-sm">
              <span className="font-semibold">
                {adresse.lib_addre ? adresse.lib_addre : adresse.libelle_adr}
              </span>{" "}
              ({adresse.ville}, {adresse.pays})
            </Typography.Text>
          </div>
        ))}
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.num_tel}
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.date_naissance
          ? dayjs(user.date_naissance).format("DD MMMM YYYY")
          : ""}
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.cin}
      </td>
      <td className="text-left p-3 whitespace-nowrap border border-gray-300">
        {user.role === "ROLE_ADMIN" && <Tag color="red">administrateur</Tag>}
        {user.role === "ROLE_STANDARD" && <Tag color="blue">standard</Tag>}
        {user.role === "ROLE_CONDIDAT" && <Tag color="green">candidat</Tag>}
        {user.role === "ROLE_Pro" && <Tag color="cyan">professionel</Tag>}
      </td>
      <td className="text-right whitespace-nowrap p-3 border border-gray-300">
        {user.role !== "ROLE_ADMIN" && (
          <div className="">
            <Button onClick={(e) => editUser(e, user)}>Détails</Button>
            <Button onClick={(e) => deleteUser(e, user.id)} danger className="ml-3">
              Supprimer
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default User;
