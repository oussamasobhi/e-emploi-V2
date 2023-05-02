import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import { Navigate } from "react-router";
import {
  Avatar,
  Typography,
  Menu,
  Breadcrumb,
  Tag,
  Popover,
  Button,
  Image,
  Upload,
} from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import {
  uploadPdp,
  getCurrentUser,
  userGetUserByUsername,
} from "../util/APIUtils";
import { API_BASE_URL } from "../constant";
import AddRating from "./review/AddRating";
import StarRatings from "react-star-ratings";

const LayoutOtherProfile = ({ setUser, setCurrentUser, currentUser, user }) => {
  const [isOpenAddReview, setIsOpenAddReview] = useState(false);
  const location = useLocation();
  const isCurrentUser = currentUser.username === user.username;

  const sideMenuItems = [
    {
      label: <Link to={"/" + user.username}>Profil</Link>,
      key: "profil",
    },
    {
      label: <Link to={"/" + user.username + "/address"}>Adresses</Link>,
      key: "addresses",
    },
    {
      label: <Link to={"/" + user.username + "/company"}>Société</Link>,
      key: "societe",
    },
    {
      label: <Link to={"/" + user.username + "/skills"}>Compétences</Link>,
      key: "competences",
    },
    {
      label: <Link to={"/" + user.username + "/annonce"}>Annonces</Link>,
      key: "annonce",
    },
  ];
  if (
    currentUser.role === "ROLE_ADMIN" &&
    user.username === currentUser.username
  ) {
    sideMenuItems.push({
      label: <Link to="/dashboard">Dashboard</Link>,
      key: "dashboard",
    });
  }

  //Breadcrumbs
  const itemsNameMap = {
    ["/" + user.username]: `${user.prenom} ${user.nom}`,
    ["/" + user.username + "/edit"]: "Mis à jour",
    ["/" + user.username + "/skills"]: "Compétences",
    ["/" + user.username + "/address"]: "Adresses",
    ["/" + user.username + "/company"]: "Société",
    ["/" + user.username + "/annonce"]: "Annonces",
  };

  const currentUrl = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = currentUrl.map((_, index) => {
    const url = `/${currentUrl.slice(0, index + 1).join("/")}`;
    return {
      title: <Link to={url}>{itemsNameMap[url]}</Link>,
    };
  });
  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
    },
  ].concat(extraBreadcrumbItems);
  /*const [file, setFile] = useState("");
  const addFile = async () => {
    try{
      const _file = await uploadFile(`D:/MULTIMEDIA/SARY/a.jpg`);
      setFile(_file);
    }catch(error){
      console.log(error);
    }
  }*/
  const handleAvatar = () => {
    console.log("avatar clicked !");
  };

  const updateUser = async () => {
    try {
      const _user = await userGetUserByUsername(currentUser.username);
      setUser(_user);
    } catch (error) {
      console.log(error);
    }
  };

  async function ajouterPhoto(event) {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    try {
      await uploadPdp(formData);
    } catch (error) {
      console.log(error);
    }
    updateUser();
  }
  const addPicture = (
    <div>
      <label
        htmlFor="file-input"
        className="relative cursor-pointer flex items-center overflow-hidden rounded-md bg-gray-200 text-gray-700 py-1 px-2 text-sm"
      >
        <span className="block cursor-pointer">Changer photo de profil</span>
        <span className="file-name absolute inset-0 z-10 hidden cursor-pointer"></span>
        <input
          id="file-input"
          type="file"
          className="opacity-0 absolute inset-0 z-20 cursor-pointer w-full h-full"
          name="pdp"
          onChange={ajouterPhoto}
          accept=".jpg, .png"
        />
      </label>
    </div>
  );

  const [imagePath, setImagePath] = useState(null);
  useEffect(() => {
    try {
      setImagePath(require("../public/files/" + user.photo_profil.name));
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    console.log(imagePath);
  }, [imagePath]);

  if (!user) return <p>Loading...</p>;
  else
    return localStorage.getItem("token") ? (
      <>
        <div className="bg-gray-100 px-12">
          <div className="flex justify-between items-center py-2 w-full">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 font-roboto h-full ">
              <div className="flex flex-col py-4 overflow-y-auto bg-white rounded-md shadow-md mx-4">
                <div className="flex flex-col items-center ">
                  <div className="w-56 border py-4 flex flex-col items-center">
                    <div className="pb-6 w-3/4 text-center flex justify-center items-center ">
                      {!isCurrentUser && (
                        <>
                          {!imagePath && (
                            <Avatar
                              size={128}
                              icon={<UserOutlined />}
                              onClick={handleAvatar}
                              className="hover:cursor-pointer outline-2"
                            />
                          )}
                          {imagePath && (
                            <Avatar
                              size={128}
                              src={imagePath}
                              onClick={handleAvatar}
                              className="hover:cursor-pointer"
                            />
                          )}
                        </>
                      )}
                      {isCurrentUser && (
                        <Popover placement="bottom" content={addPicture}>
                          {!imagePath && (
                            <Avatar
                              size={128}
                              icon={<UserOutlined />}
                              onClick={handleAvatar}
                              className="hover:cursor-pointer"
                            />
                          )}
                          {imagePath && (
                            <Avatar
                              size={128}
                              src={imagePath}
                              onClick={handleAvatar}
                              className="hover:cursor-pointer border-4 border-white shadow-md"
                            />
                          )}
                        </Popover>
                      )}
                    </div>
                    {!isCurrentUser && (
                      <Typography className="">
                        {user.prenom + " " + user.nom}
                      </Typography>
                    )}
                    {isCurrentUser && (
                      <Typography className="font-mukta text-xl lg:text-2xl">
                        {currentUser.prenom + " " + currentUser.nom}
                      </Typography>
                    )}
                    {user.role === "ROLE_ADMIN" && (
                      <Tag color="gold" className="mt-3">
                        Administrateur
                      </Tag>
                    )}
                    {user.role === "ROLE_STANDARD" && (
                      <Tag color="gold" className="mt-3">
                        Standard
                      </Tag>
                    )}
                    {user.role === "ROLE_CONDIDAT" && (
                      <Tag color="gold" className="mt-3">
                        Candidat
                      </Tag>
                    )}
                    {user.role === "ROLE_Pro" && (
                      <Tag color="gold" className="mt-3">
                        Professionnel
                      </Tag>
                    )}
                    {/*  <p className="text-neutral-500"><Button onClick={() => addFile()} >Ajouter fichier</Button> </p>*/}
                  </div>
                </div>
                <div className="text-gray-500 text-center">
                  <div>note here</div>
                  <div className="mb-2" onClick={isCurrentUser?() => {} : () => setIsOpenAddReview(true)}>
                    <StarRatings
                      rating={3}
                      starRatedColor="rgb(34 197 94)"
                      starDimension="20px"
                      starSpacing="3px"
                      
                    />
                  </div>
                  {/*!isCurrentUser && (
                    <button
                      className="border-0 py-2 transition-colors ease-in-out cursor-pointer text-white rounded-md shadow-sm bg-blue-500 hover:bg-blue-600 "
                      onClick={() => setIsOpenAddReview(true)}
                    >
                      Donner une note
                    </button>
                  )*/}
                </div>
                {
                  <div className="flex flex-col items-center mt-6">
                    {/*<Menu items={sideMenuItems} mode="inline" className="w-56" />*/}

                    <Link
                      to={"/" + user.username}
                      className="text-center hover:bg-gray-50 hover:font-semibold focus:font-semibold focus:bg-gray-50 transition-colors ease-in-out  no-underline text-blue-600 text-lg font-poppins w-full py-2"
                    >
                      <span className="px-6">Profil</span>
                    </Link>
                    <Link
                      className="text-center hover:bg-gray-50 hover:font-semibold focus:font-semibold focus:bg-gray-50 transition-colors ease-in-out  no-underline text-blue-600 text-lg font-poppins w-full py-2"
                      to={"/" + user.username + "/address"}
                    >
                      <span className="px-6">Adresses</span>
                    </Link>
                    <Link
                      to={"/" + user.username + "/company"}
                      className="text-center hover:bg-gray-50 hover:font-semibold focus:font-semibold focus:bg-gray-50 transition-colors ease-in-out  no-underline text-blue-600 text-lg font-poppins w-full py-2"
                    >
                      <span className="px-6">Société</span>
                    </Link>
                    <Link
                      to={"/" + user.username + "/skills"}
                      className="text-center hover:bg-gray-50 hover:font-semibold focus:font-semibold focus:bg-gray-50 transition-colors ease-in-out  no-underline text-blue-600 text-lg font-poppins w-full py-2"
                    >
                      <span className="px-6">Compétences</span>
                    </Link>
                    <Link
                      to={"/" + user.username + "/annonce"}
                      className="text-center hover:bg-gray-50 hover:font-semibold focus:font-semibold focus:bg-gray-50 transition-colors ease-in-out  no-underline text-blue-600 text-lg font-poppins w-full py-2"
                    >
                      <span className="px-6">Annonces</span>
                    </Link>
                  </div>
                }
              </div>

              <div className="col-span-2 overflow-y-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        {user && (
          <AddRating
            open={isOpenAddReview}
            setIsOpen={setIsOpenAddReview}
            iduser={user.id}
          />
        )}
      </>
    ) : (
      <Navigate to="/" />
    );
};

export default LayoutOtherProfile;
