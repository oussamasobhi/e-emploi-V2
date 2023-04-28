import { HomeFilled, PlusOutlined, UserOutlined } from "@ant-design/icons";
import {  Button, Menu } from "antd";
import { useState } from "react";
import logo from "../public/image/logo_itako_bsc.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css"

const NavAnt = ({ goToHome, currentUser, goToProfile, logout }) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  let connectedChildItems = [
    {
      label: <span onClick={goToProfile}>Mon Compte</span>,
      key: "mon_compte",
    },
    {
      label: <Link to="#">Mes commandes</Link>,
      key: "mes_commandes",
    },
    {
      label: <Link to="#">Mes recherches</Link>,
      key: "mes_recherches",
    },
    {
      label: <Link to="#">Mes propositions</Link>,
      key: "mes_propositions",
    },
    {
      label: <Link onClick={(e) => logout(e, goToLogin)}>Déconnexion</Link>,
      key: "deconnexion",
    },
  ];
  const connectedItems = {
    label: <span>{currentUser.prenom}</span>,
    key: "prenom_user",
    icon: (
      <UserOutlined/>
    ),
    children: connectedChildItems,
  };
  const loginItems =
    JSON.parse(localStorage.getItem("CURRENT_USER")).username.length <= 0
      ? {
          label: (
            <Link to="/login" className="">
              Connexion
            </Link>
          ),
          key: "connexion",
          icon: <UserOutlined className="font-bold" />,
        }
      : connectedItems;
  const menuItems = [
    {
      label: (
        <Link
          to="/"
          className="flex justify-center items-center px-2  text-3xl truncate"
        >
          <img src={logo} alt="logo_itako" className="h-14 w-14" />
          <span className="font-bold font-caption text-blue-500">e-emploi</span>
        </Link>
      ),
      key: "app",
    },
    {
      label: !(
        JSON.parse(localStorage.getItem("CURRENT_USER")).username.length <= 0
      ) && (
        <Link to="/annonce/create">
          <Button icon={<PlusOutlined />} type="primary">
            Déposer une annonce
          </Button>
        </Link>
      ),
      key: "add_annonce",
    },
    loginItems,
    {
      label: <span onClick={goToHome}>Accueil</span>,
      key: "home",
      icon: <HomeFilled />,
    },
    {
      label: "Domicile",
      key: "domicile",
      children: [
        {
          label: <Link to="/domicile/nettoyage">Services Nettoyages</Link>,
          key: "houseKeeper",
        },
        {
          label: <Link to="/domicile/artisan">Service Artisan</Link>,
          key: "artisan",
        },
      ],
    },
    {
      label: "Emplois et Services",
      key: "emp_services",
      children: [
        {
          label: <Link to="/emp_serv/emploi">Offres d'mploi</Link>,
          key: "offre_emploi",
        },
        {
          label: <Link to="/emp_serv/service">Services</Link>,
          key: "compet_list",
        },
      ],
    },
    {
      label: "Produits",
      key: "produit",
      children: [
        {
          label: "Produit - Recherche",
          key: "prod_recherche",
        },
      ],
    },
    {
      label: "FAQ",
      key: "faq",
      children: [
        {
          label: "A propos",
          key: "about",
        },
        {
          label: "Contact",
          key: "contact",
        },
      ],
    },
  ];
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="bg-white w-full font-roboto shwdow-md">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
        className="flex-auto justify-between font-caption text-md capitalize"
      />
    </div>
  );
};

export default NavAnt;
