import React  from "react";
import { Outlet } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import { Navigate } from "react-router";
import { Avatar, Typography, Menu, Breadcrumb, Tag } from "antd";
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

  if (!user) return <p>Loading...</p>;
  else
    return localStorage.getItem("token") ? (
      <>
        <div className="grid grid-cols-3 font-roboto h-full ">
          <div className="flex flex-col p-4 overflow-y-auto ">
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
                {user.role === "ROLE_ADMIN" && (
                  <Tag color="red" className="mt-3">
                    Administrateur
                  </Tag>
                )}
                {user.role === "ROLE_STANDARD" && (
                  <Tag color="red" className="mt-3">
                    Standard
                  </Tag>
                )}
                {user.role === "ROLE_CONDIDAT" && (
                  <Tag color="red" className="mt-3">
                    Candidat
                  </Tag>
                )}
                {user.role === "ROLE_Pro" && (
                  <Tag color="red" className="mt-3">
                    Professionnel
                  </Tag>
                )}
              {/*  <p className="text-neutral-500"><Button onClick={() => addFile()} >Ajouter fichier</Button> </p>*/}
              </div>
            </div>
            <div className="flex flex-col items-center mt-6">
              <Menu items={sideMenuItems} mode="inline" className="w-56" />
            </div>
          </div>

          <div className="py-4 col-span-2 overflow-y-auto">
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
