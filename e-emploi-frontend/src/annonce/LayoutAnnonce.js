import { Layout, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { getAnnonceById, userGetUserByUsername } from "../util/APIUtils";

const LayoutAnnonce = ({currentUser}) => {
  const { id } = useParams();
  const  username = (useParams())["*"]
  const location = useLocation();
  const [annonce, setAnnonce] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getAnnonce = async (id) => {
      try {
        const _res = await getAnnonceById(id);
        setAnnonce(_res);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) getAnnonce(id);
  }, [id]);
  useEffect(() => {
    const getUser = async (username) => {
      try {
        const _res = await userGetUserByUsername(username);
        setUser(_res);
      } catch (error) {
        console.log(error);
      }
    };
    if (username && username !== "create") getUser(username);
    console.log(username)
  }, [username]);

  
  //Breadcrumbs
  const itemsNameMap = {
    "/annonce": "Annonces",
    ["/annonce/" + id]: annonce?annonce.titre_annonce : "",
    ["/annonce/"+ id + "/"+ username] : "Message",
    "/annonce/create": "Créer une annonce"
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
  return (
    <Layout>
      {/* <Layout.Sider className="">
        <div className="bg-white h-full">This is the left part</div>
      </Layout.Sider>*/}
      <Layout.Content>
        {/*Breadcrumb here */}
        <div className="px-2 py-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="flex-nowrap justify-center w-auto">
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default LayoutAnnonce;
