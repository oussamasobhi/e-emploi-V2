import React from "react";
import { Outlet } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import { Navigate } from "react-router";
import { Avatar, Typography, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const LayoutOtherProfile = ({ currentUser, user }) => {
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
      label: "Annonces",
      key: "annonce",
      children: [
        {
          label: (
            <Link to={"/" + user.username + "/nettoyage"}>Services Nettoyages</Link>
          ),
          key: "nettoyage",
        },
        {
          label: (
            <Link to={"/" + user.username + "/artisan"}>Sevices Artisans</Link>
          ),
          key: "artisan",
        },

        {
          label: <Link to={"/" + user.username + "/emploi"}>Offres d'emploi</Link>,
          key: "emploi",
        },
        {
          label: <Link to={"/" + user.username + "/service"}>Sevices</Link>,
          key: "service",
        },
        {
          label: "Produits",
          key: "Produit",
        },
      ],
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
    ["/" + user.username + "/nettoyage"]: "Services Nettoyages",
    ["/" + user.username + "/artisan"]: "Services Artisans",
    ["/" + user.username + "/emploi"]: "Offres d'emploi",
    ["/" + user.username + "/service"]: "Services",
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

  if (!user) return <p>Loading...</p>;
  else
    return localStorage.getItem("token") ? (
      <>
        <div className="flex min-h-screen font-roboto">
          <div className="w-1/3 flex flex-col p-4">
            <div className="flex flex-col items-center">
              <div className="bg-white w-56 border rounded-md py-4 flex flex-col items-center">
                <div className="pb-6 w-3/4 text-center flex justify-center items-center">
                  <Avatar size={128} icon={<UserOutlined />} />
                </div>
                {!isCurrentUser && (
                  <Typography>{user.prenom + " " + user.nom}</Typography>
                )}
                {isCurrentUser && (
                  <Typography>
                    {currentUser.prenom + " " + currentUser.nom}
                  </Typography>
                )}
                <p className="text-neutral-500">{/*TO DO*/}</p>
              </div>
            </div>
            <div className="flex flex-col items-center mt-6">
              <Menu items={sideMenuItems} mode="inline" className="w-56" />
            </div>
          </div>
          <div className="w-2/3 py-4 overflow-y-auto">
            <div className="container ">
              <div className="border bg-white rounded-md px-3 w-10/12">
                <div className="pb-6">
                  <div className="flex justify-between  w-full">
                    <Breadcrumb items={breadcrumbItems} />
                  </div>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <Navigate to="/" />
    );
};

export default LayoutOtherProfile;
