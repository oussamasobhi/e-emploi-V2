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
import { Button, Image, Carousel, Typography, message, Avatar } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
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

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  if (!annonce) return <p>Loading...</p>;
  else
    return (
      <div className=" bg-gray-100 flex flex-col items-center ">
        <div className="bg-white w-135 rounded-t-md shadow-md overflow-hidden">
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={contentStyle}>Photo 1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>Photo 2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>Photo 3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>Photo 4</h3>
            </div>
          </Carousel>

          <div className="p-2">
            <div className="flex justify-between items-start py-2">
              <div className="flex flex-col">
                <Typography className="text-3xl font-caption text-blue-800 flex-auto">
                  {annonce.titre_annonce}
                </Typography>
                <Typography className="text-sm text-gray-600 font-mukta">
                  {annonce.categorie2Annonce}
                </Typography>
              </div>

              <Typography className="text-3xl font-roboto text-blue-600 w-fit flex-none">
                {annonce.tarif_depart} DH
              </Typography>
            </div>
            <div className="flex mb-3 justify-between items-start py-3 border border-gray-400 ">
              <div className="flex items-center">
                {!annonce?.userResponse?.photo_profil && (
                  <Avatar icon={<UserOutlined />} className="mr-2 scale-110" />
                )}
                {annonce?.userResponse?.photo_profil && (
                  <Avatar
                    src={require("../public/files/" +
                      annonce.userResponse.photo_profil.name)}
                    className="mr-2 scale-110"
                  />
                )}
                <div className="flex flex-col">
                  <Link
                    className="text-lg text-gray-700 hover:text-gray-700 hover:underline font-caption "
                    to={"/" + annonce.userResponse.username}
                  >
                    {annonce.userResponse.nom} {annonce.userResponse.prenom}
                  </Link>
                  {annonce?.userResponse?.email && (
                    <Typography className="text-sm text-gray-500">
                      {annonce.userResponse.email}
                    </Typography>
                  )}
                </div>
              </div>
              <Typography className="text-2xl font-poppins text-green-500">
                {annonce.userResponse.num_tel}
              </Typography>
            </div>
            <div className="text-xl">
              <Typography className="font-roboto text-gray-800 text-lg">
                {annonce.description}
              </Typography>

              <p className="capitalize text-sm text-gray-500 font-caption">
                {dayjs(annonce.createdAt).format("DD MMMM YYYY")}
              </p>
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
                <Typography className="text-xl text-gray-800 font-caption font-bold">
                  Intéressées
                </Typography>
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
      </div>
    );
};

export default AnnonceDetail;
