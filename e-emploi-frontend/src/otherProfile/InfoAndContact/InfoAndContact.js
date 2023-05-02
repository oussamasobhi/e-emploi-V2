import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";
import dayjs from "dayjs";
import "react-chat-widget/lib/styles.css";
import {
  CalendarOutlined,
  EyeFilled,
  EyeOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

const InfoAndContact = ({ currentUser, user }) => {
  const isCurrentUser = currentUser.username === user.username;

  if (!user) return <p>Loading...</p>;
  else
    return (
      <div className="">
        <div className="rounded-md shadow-md overflow-hidden  bg-white">
          <Typography className="font-poppins text-2xl text-gray-800 py-2 text-center bg-gray-200">
            Informations et Contacts
          </Typography>
          <div className="grid grid-cols-2 px-6 font-caption py-3">
            <div className="flex items-center mb-2">
              <UserOutlined className="mr-2" />
              Nom
            </div>
            <div>
              &nbsp;:&nbsp;{isCurrentUser && currentUser.nom}
              {!isCurrentUser && user.nom}&nbsp;
              {isCurrentUser && currentUser.prenom}
              {!isCurrentUser && user.prenom}
            </div>
            <div className="flex items-center mb-2">
              <EyeOutlined className="mr-2" />
              Pseudo
            </div>
            <div>
              &nbsp;:&nbsp;{isCurrentUser && currentUser.username}
              {!isCurrentUser && user.username}
            </div>
            <div className="flex items-center mb-2">
              <MailOutlined className="mr-2" />
              Email
            </div>
            <div>
              &nbsp;:&nbsp;{isCurrentUser && currentUser.email}
              {!isCurrentUser && user.email}
            </div>
            {user.num_tel && (
              <>
                {" "}
                <div className="flex items-center mb-2">
                  <PhoneOutlined className="mr-2" />
                  Téléphone
                </div>
                <div>
                  &nbsp;:&nbsp;{isCurrentUser && currentUser.num_tel}
                  {!isCurrentUser && user.num_tel}
                </div>
              </>
            )}
            {user.date_naissance && (
              <>
                {" "}
                <div className="flex items-center mb-2">
                  <CalendarOutlined className="mr-2" />
                  Date de naissance
                </div>
                <div>
                  &nbsp;:&nbsp;
                  {!isCurrentUser && user.date_naissance
                    ? dayjs(user.date_naissance).format("DD MMMM YYYY")
                    : ""}
                  {isCurrentUser && currentUser.date_naissance
                    ? dayjs(user.date_naissance).format("DD MMMM YYYY")
                    : ""}
                </div>
              </>
            )}
            {user.cin && (
              <>
                {" "}
                <div className="flex items-center mb-2">
                  <IdcardOutlined className="mr-2" />
                  CIN
                </div>
                <div>
                  &nbsp;:&nbsp;{isCurrentUser && currentUser.cin}
                  {!isCurrentUser && user.cin}
                </div>
              </>
            )}
          </div>
          {isCurrentUser && (
            <div className="mb-4">
              <Button type="link">
                <Link
                  to={"/" + currentUser.username + "/edit"}
                  className="text-xl"
                >
                  Modifier votre profil
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
};

export default InfoAndContact;
