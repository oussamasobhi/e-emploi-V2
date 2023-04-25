import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import {
  getAnnonceById,
  getChatUsers,
  getChatUsersByAnnonce,
  uploadFile,
} from "../util/APIUtils";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Button, Image, Tag, Typography } from "antd";
import { MessageFilled, MessageOutlined } from "@ant-design/icons";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const AnnonceDetail = ({ currentUser }) => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [chatUsers, setChatUsers] = useState(null);
  useEffect(() => {
    const loadAnnonce = async () => {
      try {
        const _annonce = await getAnnonceById(id);
        setAnnonce(_annonce);
      } catch (error) {
        console.log(error);
      }
    };
    loadAnnonce();
  }, [id]);
  useEffect(() => {
    const loadChatUsers = async () => {
      try {
        const res = await getChatUsersByAnnonce(id);
        setChatUsers(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadChatUsers();
  }, [currentUser]);
  useEffect(() => {
    console.log(chatUsers);
  }, [chatUsers]);

  if (annonce) console.log(annonce.userResponse);

  const [fileUploaded, setFileUploaded] = useState(null);
  useEffect(() => {
    console.log(fileUploaded);
  }, [fileUploaded]);
  const handleFileChange = (event) => {
    setFileUploaded(event.target.files[0]);
  };
  const addFile = async () => {
    console.log(fileUploaded);
    const formData = new FormData();
    formData.append("annonce_id",annonce.id);
    formData.append("user_id", currentUser.id)
    formData.append("file", fileUploaded);
    try {
      await uploadFile(formData);
    } catch (error) {
      console.log(error);
    }
  };

  //if(annonce.userResponse) console.log(currentUser.username === annonce.userResponse.username);
  if (!annonce) return <p>Loading...</p>;
  else
    return (
      <>
        <div className="px-10 py-2">
          <div className="flex justify-between items-center py-2">
            <Typography className="text-2xl uppercase font-bold">
              {annonce.titre_annonce}
            </Typography>
            <Typography className="text-3xl text-blue-600">
              {annonce.tarif_depart} DH
            </Typography>
          </div>
          <p className="text-xl">
            <span className="font-semibold">Type : </span>
            {annonce.categorie2Annonce}
          </p>
          <div className="text-xl">
            {annonce.description}
            <p className="capitalize text-md text-gray-600 ">
              {dayjs(annonce.createdAt).fromNow()}{" "}
            </p>
          </div>

          <div className="flex mb-6 justify-between items-start">
            <div className="flex flex-col">
              <Link
                className="text-lg"
                to={"/" + annonce.userResponse.username}
              >
                {annonce.userResponse.nom} {annonce.userResponse.prenom}
              </Link>
              {annonce.userResponse.role === "ROLE_ADMIN" && (
                <Tag color="red" className="mt-3">
                  Administrateur
                </Tag>
              )}
              {annonce.userResponse.role === "ROLE_STANDARD" && (
                <Tag color="red" className="mt-3">
                  Standard
                </Tag>
              )}
              {annonce.userResponse.role === "ROLE_CONDIDAT" && (
                <Tag color="red" className="mt-3">
                  Candidat
                </Tag>
              )}
              {annonce.userResponse.role === "ROLE_Pro" && (
                <Tag color="red" className="mt-3">
                  Professionnel
                </Tag>
              )}
            </div>
            <div className="flex flex-col">
              <Typography className="text-xl">
                {annonce.userResponse.num_tel}{" "}
              </Typography>
              <Typography className="text-xl">
                {annonce.userResponse.email}{" "}
              </Typography>
            </div>
          </div>
          {currentUser.username !== annonce.userResponse.username && (
            <Button icon={<MessageOutlined />} type="primary">
              <Link
                to={
                  "/annonce/" + annonce.id + "/" + annonce.userResponse.username
                }
              >
                Message
              </Link>
            </Button>
          )}
          
        </div>
        {/*test adding file*/}
        {annonce?.userResponse?.username === currentUser.username && (
          <>
            <div className="px-10">
              <div className="flex justify-between items-start">
                <input type="file" onChange={handleFileChange} />
                <Button onClick={addFile}>Ajouter</Button>
              </div>

              <p className="text-xl font-semibold">Messages</p>
              {chatUsers?.map((user) => (
                <>
                  {user.username !== currentUser.username && (
                    <div>
                      <Link to={"/annonce/" + id + "/" + user.username}>
                        {user.prenom} {user.nom}
                      </Link>
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        )}
      </>
    );
};

export default AnnonceDetail;
