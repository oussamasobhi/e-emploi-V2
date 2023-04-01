import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";
import dayjs from "dayjs";

const PersonalInfoPage = ({ currentUser }) => {
  return (
    <>
      <div className="border-b">
        <Typography.Title level={3} className="uppercase text-center">
          Informations et Contacts
        </Typography.Title>
        <table>
          <tbody>
            <tr>
              <td>Nom d'utilisateur: </td>
              <td className="pl-20">{currentUser.username}</td>
            </tr>
            <tr>
              <td>Email : </td>
              <td className="pl-20 text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
                {currentUser.email}
              </td>
            </tr>
            <tr>
              <td>Telephone : </td>
              <td className="pl-20">{currentUser.num_tel}</td>
            </tr>
            <tr>
              <td>CIN : </td>
              <td className="pl-20">{currentUser.cin}</td>
            </tr>
            <tr>
              <td>Date de naissance : </td>
              <td className="pl-20">{dayjs(currentUser.date_naissance).format("DD MMMM YYYY")}</td>
            </tr>
          </tbody>
        </table>
        <div className="mb-4">
          <Button type="link">
            <Link to="/profile/edit" className="text-xl">Modifier votre profil</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoPage;
