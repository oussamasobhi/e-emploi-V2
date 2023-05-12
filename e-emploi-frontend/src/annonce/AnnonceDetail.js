import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getAnnonceById,
  getChatUsersByAnnonce,
  addPostuleFile,
  getPostuleFiles,
  addFileAnnonce,
  getAnnonceFiles,
  getAnnonceUser,
  deleteAnnonce,
} from "../util/APIUtils";

import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Image, Typography, message, Avatar, Spin, Modal } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import AnnonceUser from "./AnnonceUser";
import MyCarousel from "../common/MyCarousel";
import { MoreHoriz } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const AnnonceDetail = ({ currentUser }) => {
  const id = useParams().id;
  const [annonce, setAnnonce] = useState(null);
  const [chatUsers, setChatUsers] = useState(null);
  const [myFiles, setMyFiles] = useState(null);
  const [myAnnonceFiles, setMyAnnonceFiles] = useState(null);
  const [fileValue, setFileValue] = useState(null);
  const [fileAnnonce, setFileAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [annonceUser, setAnnonceUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnnonce = async () => {
      setLoading(true);
      console.log(id);
      try {
        const res = await getAnnonceById(id);
        console.log(res);
        setAnnonce(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadAnnonce();
  }, []);
  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      try {
        const res = await getPostuleFiles(annonce.id, currentUser.id);
        console.log(res);
        setMyFiles(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const loadAnnonceFiles = async () => {
      setLoading(true);
      try {
        const res = await getAnnonceFiles(annonce.id);
        setMyAnnonceFiles(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (annonce) {
      loadFiles();
      loadAnnonceFiles();
    }
  }, [annonce, currentUser]);

  useEffect(() => {
    setLoading(true);
    const loadAnnonce = async () => {
      console.log(id);
      try {
        const res = await getAnnonceById(id);
        setAnnonce(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadAnnonce();
  }, [id]);
  useEffect(() => {
    const loadChatUsers = async () => {
      setLoading(true);
      try {
        const res = await getChatUsersByAnnonce(id);
        setChatUsers(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadChatUsers();
  }, [currentUser]);

  useEffect(() => {
    console.log(chatUsers);

    const loadAnnonceUser = async () => {
      setLoading(true);
      try {
        const res = await getAnnonceUser(annonce.id, currentUser.id);
        setAnnonceUser(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (annonce?.userResponse?.username !== currentUser.username) {
      loadAnnonceUser();
    }
  }, [chatUsers, annonce, currentUser]);

  const handleFileChange = (event) => {
    setFileValue(event.target.files[0]);
  };
  const handleAddFile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", fileValue);
    try {
      if (currentUser) {
        const res = await addPostuleFile(annonce.id, currentUser.id, formData);
        console.log(res);
        setFileValue(null);
        message.success("Fichier ajouté");
        refreshFiles();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
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

  const handleFileAnnonceChange = (event) => {
    setFileAnnonce(event.target.files[0]);
  };
  const handleAddFileAnnonce = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", fileAnnonce);
    try {
      if (currentUser) {
        const res = await addFileAnnonce(annonce.id, formData);
        console.log(res);
        setFileAnnonce(null);
        message.success("Fichier ajouté");
        refreshAnnonceFiles();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAnnonceFiles = async () => {
    setLoading(true);
    try {
      const res = await getAnnonceFiles(annonce.id);
      console.log(res);
      setMyAnnonceFiles(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(myAnnonceFiles);
  }, [myAnnonceFiles]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const supprimerAnnonce = async () => {
    try {
      await deleteAnnonce(annonce.id);
      setIsOpenDelete(false);
     navigate("/annonce");
      message.success({
        content: "Annonce supprimée",
        className: "relative top-16",
      });

    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center">
        {" "}
        <Spin size="large" />
      </div>
    );
  else if (!annonce)
    return (
      <div className="flex justify-center">
        {" "}
        <Spin size="large" />
      </div>
    );
  else
    return (
      <div className=" bg-gray-100 flex flex-col items-center overflow-hidden">
        <div className="bg-white w-w1 relative overflow-hidden pt-8 shadow-md">
          {annonce?.userResponse.username === currentUser.username && (
            <div className="absolute top-0 right-0">
              <Button
                variant="text"
                sx={{ marginLeft: "auto", color: "inherit" }}
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHoriz sx={{ color: "#444444" }} />
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  onClick={(e) => {
                    handleClose();
                  }}
                >
                  Modifier l'annonce
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsOpenDelete(true);
                    handleClose();
                  }}
                >
                  Supprimer l'annonce
                </MenuItem>
              </Menu>
            </div>
          )}
          <div className="flex flex-col items-center">
            <Typography className="text-green-500 text-lg font-roboto">
              {annonce.categorie2Annonce}
            </Typography>
            <Typography className="font-poppins text-4xl text-my-blue ">
              {annonce.titre_annonce}
            </Typography>
            <Typography className="font-roboto text-gray-400 my-3">
              {dayjs(annonce.createdAt).format("DD MMMM YYYY")}{" "}
              <span className="text-lg font-bold">.</span> par{" "}
              {annonce.userResponse.prenom + " " + annonce.userResponse.nom}{" "}
            </Typography>
          </div>
          {myAnnonceFiles && (
            <div className="relative z-0 flex justify-center items-center flex-col">
              <MyCarousel
                loading={loading}
                setLoading={setLoading}
                images={myAnnonceFiles}
              />
              <div className="rounded-full shadow-md bg-white absolute -bottom-12 z-40 flex justify-center items-center overflow-hidden">
                {!annonce?.userResponse?.photo_profil && (
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    className="border-4 border-white shadow-md"
                  />
                )}
                {annonce?.userResponse?.photo_profil && (
                  <Avatar
                    size={120}
                    src={require("../public/files/" +
                      annonce.userResponse.photo_profil.name)}
                    className="border-4 border-white shadow-md"
                  />
                )}
              </div>
              <div className="absolute z-40 top-0 right-0 w-fit bg-red-600 rounded-l-xl px-3 py-1">
                <Typography className="text-xl font-poppins text-white flex-none ">
                  {annonce.tarif_depart} DH
                </Typography>
              </div>
            </div>
          )}
          {currentUser.username === annonce?.userResponse?.username && (
            <div className="flex py-2 px-1 justify-start">
              <label
                htmlFor="file-annonce"
                className="relative flex items-center overflow-hidden rounded-md bg-gray-200 text-gray-700 cursor-pointer py-1 px-2 text-sm"
              >
                <span className="block">Ajouter une photo </span>
                <span className="file-name absolute inset-0 z-10 hidden"></span>
                <input
                  id="file-annonce"
                  type="file"
                  className="opacity-0 absolute inset-0 z-20 cursor-pointer w-full h-full"
                  name="document_annonce"
                  onChange={handleFileAnnonceChange}
                  accept=".jpg, .png"
                />
              </label>
              {fileAnnonce && (
                <button
                  className="border-0 ml-3 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out text-white hover:text-white p-2"
                  onClick={handleAddFileAnnonce}
                >
                  Enregistrer
                </button>
              )}
            </div>
          )}

          <div
            className={
              "p-2 " +
              (currentUser.username !== annonce?.userResponse?.username
                ? "mt-12"
                : "")
            }
          >
            <div className="flex justify-center items-center">
              <span className="text-gray-400 text-lg">Ajouté par &nbsp;</span>
              <Link
                className="text-lg text-red-700 hover:text-red-700 hover:underline font-caption "
                to={"/" + annonce.userResponse.username}
              >
                {annonce.userResponse.nom} {annonce.userResponse.prenom}
              </Link>
            </div>
            <div className="mt-8">
              <Typography className="font-poppins px-3 text-gray-700 text-lg">
                {annonce.description}
              </Typography>
              <div className="flex justify-end py-3">
                
                {annonceUser &&
                  annonceUser.statusAnnonce === "Demande_Envoyé" && (
                    <Typography className="text-red-500 font-archivo">
                      Demande envoyée
                    </Typography>
                  )}
                {annonceUser &&
                  annonceUser.statusAnnonce === "Discussion_engagé" && (
                    <Typography className="text-red-500 font-archivo">
                      Discussion engagée
                    </Typography>
                  )}
                {annonceUser &&
                  annonceUser.statusAnnonce === "Accord_Etablie" && (
                    <Typography className="text-red-500 font-archivo">
                      Accord établi
                    </Typography>
                  )}
                {annonceUser && annonceUser.statusAnnonce === "Terminé" && (
                  <Typography className="text-red-500 font-archivo">
                    Terminé
                  </Typography>
                )}
              </div>
            </div>

            {currentUser.username !== annonce.userResponse.username && (
              <div className="flex flex-col">
                {/*ajouter fichier*/}
                <div className="flex mb-2 justify-between">
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
                    <button
                      className="border-0 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out text-white hover:text-white p-2"
                      onClick={handleAddFile}
                    >
                      Enregistrer
                    </button>
                  )}
                  <Link
                    to={
                      "/annonce/" +
                      annonce.id +
                      "/" +
                      annonce.userResponse.username
                    }
                    className="border-0 rounded-md bg-indigo-700 hover:bg-indigo-800 transition-colors ease-in-out text-white hover:text-white p-2"
                  >
                    <MessageOutlined className="mr-2" />
                    Message
                  </Link>
                </div>
                {myFiles && (
                  <div className="">
                    {myFiles.length > 0 && (
                      <div>
                        <div className="flex flex-wrap justify-start">
                          {myFiles.map((file, index) => (
                            <Image
                              key={index}
                              style={{
                                objectFit: "cover",
                                margin: "0.5rem",
                                width: 120,
                                height: 120,
                                "@media screen and (minWidth: 640px)": {
                                  objectFit: "cover",
                                  width: 140,
                                  height: 140,
                                },
                                "@media screen and (minWidth: 768px)": {
                                  objectFit: "cover",
                                  width: 160,
                                  height: 160,
                                },
                                "@media screen and (minWidth: 1024px)": {
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
              </div>
            )}
          </div>
          {/*test adding file*/}
          {annonce?.userResponse?.username === currentUser.username && (
            <>
              <div className="px-2">
                <Typography className="text-xl text-gray-800 font-poppins font-bold">
                  Intéressées
                </Typography>
                {chatUsers?.map((user, index) => (
                  <>
                    {user.username !== currentUser.username && (
                      <AnnonceUser idannonce={id} username={user.username} />
                    )}
                  </>
                ))}
              </div>
            </>
          )}
        </div>
        <Modal
          title="Voulez vous vraiment supprimer cette annonce?"
          open={isOpenDelete}
          onOk={() => supprimerAnnonce()}
          onCancel={() => setIsOpenDelete(false)}
          okText="Supprimer"
          cancelText="Annuler"
        ></Modal>
      </div>
    );
};

export default AnnonceDetail;
