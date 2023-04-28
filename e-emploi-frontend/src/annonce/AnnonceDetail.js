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
import { Button, Image, Tag, Typography, message } from "antd";
import {
  MessageFilled,
  MessageOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AnnonceUser from "./AnnonceUser";
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
        setMyFiles(res);
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
        setFileValue(null);
        message.success("Fichier ajouté");
        refreshFiles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshFiles = async () => {
    try {
      const res = await getPostuleFiles(annonce.id, currentUser.id);
      console.log(res);
      setMyFiles(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (!annonce) return <p>Loading...</p>;
  else
    return (
      <div className="bg-white">
        <div className="px-10 py-2">
          <div className="flex justify-between items-center py-2">
            <Typography className="text-2xl uppercase font-bold">
              {annonce.titre_annonce}
            </Typography>
            <Typography className="text-3xl ">
              <span>Tarif : </span> <span className="text-red-600 font-bold">{annonce.tarif_depart} DH</span>
            </Typography>
          </div>
          <p className="text-xl">
            <span className="font-semibold">Type : </span>
            {annonce.categorie2Annonce}
          </p>
          <div className="text-xl">
            {annonce.description}
            <p className="capitalize text-sm text-gray-600 ">
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
              <div className="flex">
                <label
                  htmlFor="file-input"
                  className="relative flex items-center overflow-hidden rounded-md bg-gray-200 text-gray-700 cursor-pointer py-1 px-2 text-sm"
                >
                  <span className="block">Ajouter une photo </span>
                  <span className="file-name absolute inset-0 z-10 hidden"></span>
                  <input
                    id="file-input"
                    type="file"
                    className="opacity-0 absolute inset-0 z-20 cursor-pointer w-full h-full"
                    name="document"
                    onChange={handleFileChange}
                    accept=".jpg, .png"
                  />
                </label>
                {fileValue && (
                  <Button
                    type="primary"
                    className="mx-3"
                    onClick={handleAddFile}
                  >
                    Enregistrer
                  </Button>
                )}
              </div>
              {myFiles && (
                <div className="px-2">
                  {myFiles.length > 0 && (
                    <div>
                      <Typography className="font-serif text-xl underline underline-offset-2">
                        Pièces jointes :{" "}
                      </Typography>
                      <div className="flex flex-wrap justify-start">
                        {myFiles.map((file, index) => (
                          <Image
                            key={index}
                            style={{
                              objectFit: "cover",
                              margin: "0.5rem",
                              width: 120,
                              height: 120,
                              "@media screen and (min-width: 640px)": {
                                objectFit: "cover",
                                width: 140,
                                height: 140,
                              },
                              "@media screen and (min-width: 768px)": {
                                objectFit: "cover",
                                width: 160,
                                height: 160,
                              },
                              "@media screen and (min-width: 1024px)": {
                                objectFit: "cover",
                                width: 180,
                                height: 180,
                              },
                            }}
                            src={require("../public/files/" + file.name)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
              <p className="text-xl font-semibold">Les personnes intéressées</p>
              {chatUsers?.map((user) => (
                <>
                  {user.username !== currentUser.username && (
                    <div>
                      
                      <AnnonceUser idannonce={id} username={user.username} />
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        )}
      </div>
    );
};

export default AnnonceDetail;
