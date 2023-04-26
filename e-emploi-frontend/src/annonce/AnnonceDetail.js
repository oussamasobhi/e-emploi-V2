import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import {
  getAnnonceById,
  getChatUsersByAnnonce,
  addAnnonceUser,
  addPostuleFile,
  getPostuleFiles,
} from "../util/APIUtils";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Button, Image, Tag, Typography } from "antd";
import {
  MessageFilled,
  MessageOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const AnnonceDetail = ({ currentUser }) => {
  const id = useParams().id;
  const [annonce, setAnnonce] = useState(null);
  const [chatUsers, setChatUsers] = useState(null);
  const [myFiles, setMyFiles] = useState(null);
  const [fileValue, setFileValue] = useState(null);
  const [postuleAnnonce, setPostuleAnnonce] = useState(new Map());
  useEffect(() => {
    const loadAnnonce = async () => {
      console.log(id);
      try {
        const res = await getAnnonceById(id);
        console.log(res);
        setAnnonce(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadAnnonce();
  }, []);
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await getPostuleFiles(annonce.id, currentUser.id);
        console.log(res);
        //setMyFiles(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (annonce) loadFiles();
  }, [annonce, currentUser]);

  useEffect(() => {
    const loadAnnonce = async () => {
      console.log(id);
      try {
        const res = await getAnnonceById(id);
        setAnnonce(res);
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
    const createAnnonceUser = async () => {
      const request = { idannonce: annonce.id };
      try {
        const res = await addAnnonceUser(request);
        console.log(res);
        //setPostuleAnnonce(postuleAnnonce.set(currentUser.username,  ))}
      } catch (error) {
        console.log(error);
      }
    };
    if (!chatUsers?.some((obj) => obj.username === currentUser.username))
      if (annonce?.userResponse?.username !== currentUser.username) {
        createAnnonceUser();
      }
  }, [chatUsers, annonce, currentUser]);

  const handleFileChange = (event) => {
    setFileValue(event.target.files[0]);
  };
  const handleAddFile = async () => {
    const formData = new FormData();
    formData.append("file", fileValue);
    try {
      if (currentUser) {
        const res = await addPostuleFile(annonce.id, currentUser.id, formData);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="flex flex-col">
              {/*ajouter fichier*/}
              <div className="flex justify-between">
                <input
                  type="file"
                  name="document"
                  onChange={handleFileChange}
                />
                <Button type="text" onClick={handleAddFile}>
                  <PlusCircleOutlined />{" "}
                </Button>
              </div>
              <div>
                <Button icon={<MessageOutlined />} type="primary">
                  <Link
                    to={
                      "/annonce/" +
                      annonce.id +
                      "/" +
                      annonce.userResponse.username
                    }
                  >
                    Message
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        {/*test adding file*/}
        {annonce?.userResponse?.username === currentUser.username && (
          <>
            <div className="px-10">
              {/*<div className="flex justify-between items-start">
                <input type="file" onChange={handleFileChange} />
                <Button onClick={addFile}>Ajouter</Button>
        </div>*/}

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
