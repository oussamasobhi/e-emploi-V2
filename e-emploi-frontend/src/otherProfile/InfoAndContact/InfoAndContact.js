import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";
import dayjs from "dayjs";

const InfoAndContact = ({ currentUser, user }) => {
  const isCurrentUser = currentUser.username === user.username;

  if (!user) return <p>Loading...</p>;
  else
    return (
      <>
        <div className="border-b">
          <Typography.Title level={3} className="uppercase text-center">
            Informations et Contacts
          </Typography.Title>
          <table>
            <tbody>
            <tr>
                <td>Nom : </td>
                <td className="pl-20">
                {isCurrentUser && currentUser.nom}
                  {!isCurrentUser && user.nom}</td>
              </tr>
               <tr>
                <td>Prénoms : </td>
                <td className="pl-20">
                {isCurrentUser && currentUser.prenom}
                  {!isCurrentUser && user.prenom}</td>
              </tr>
              <tr>
                <td>Nom d'utilisateur: </td>
                <td className="pl-20">
                {isCurrentUser && currentUser.username}
                  {!isCurrentUser && user.username}</td>
              </tr>
              <tr>
                <td>Email : </td>
                <td className="pl-20 text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
                {isCurrentUser && currentUser.email}
                  {!isCurrentUser && user.email}
                </td>
              </tr>
              <tr>
                <td>Telephone : </td>
                <td className="pl-20">
                {isCurrentUser && currentUser.num_tel}
                  {!isCurrentUser && user.num_tel}
                </td>
              </tr>
              <tr>
                <td>CIN : </td>
                <td className="pl-20">
                  {isCurrentUser && currentUser.cin}
                  {!isCurrentUser && user.cin}</td>
              </tr>
              <tr>
                <td>Date de naissance : </td>
                <td className="pl-20">
                  {!isCurrentUser && user.date_naissance
                    ? dayjs(user.date_naissance).format("DD MMMM YYYY")
                    : ""}
                    {isCurrentUser && currentUser.date_naissance
                    ? dayjs(user.date_naissance).format("DD MMMM YYYY")
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>
          {isCurrentUser && (
            <div className="mb-4">
              <Button type="link">
                <Link to={"/"+currentUser.username+"/edit"} className="text-xl">
                  Modifier votre profil
                </Link>
              </Button>
            </div>
          )}
        </div>
      </>
    );
};

export default InfoAndContact;
