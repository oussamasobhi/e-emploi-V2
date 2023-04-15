import { HomeFilled } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState } from "react";
import logo from "../public/image/logo_itako_bsc.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clipRule="evenodd"
        />
      </svg>
    ),
    children: connectedChildItems,
  };
  const connItems = [
    JSON.parse(localStorage.getItem("CURRENT_USER")).username.length <= 0
      ? {
          label: <Link to="/login">Connexion</Link>,
          key: "connexion",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          ),
        }
      : connectedItems,
  ];
  const menuItems = [
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
    <>
      <Header className="bg-white w-full font-roboto">
        <div className="flex">
          <Link
            to="/"
            className="flex justify-center items-center px-2 text-cyan text-3xl truncate"
          >
            <img src={logo} alt="logo_itako" className="h-14 w-14" />
            e-emploi
          </Link>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={connItems}
            className="flex-auto items-center justify-center"
          />
          {!(
            JSON.parse(localStorage.getItem("CURRENT_USER")).username.length <=
            0
          ) && (
            <Link to="/annonce/create">
              <Button type="primary">Ajouter une annonce</Button>
            </Link>
          )}

          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={menuItems}
            className="flex-auto justify-end"
          />
        </div>
      </Header>
    </>
  );
};

export default NavAnt;
