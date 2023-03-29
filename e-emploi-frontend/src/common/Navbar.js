import { Popover } from "@headlessui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialUser } from "../constant";
import logo from "../public/image/logo_itako_bsc.jpg";

const Navbar = ({ isAuth, currentUser, onLogout, setIsLoading }) => {
  const navigate = useNavigate();
  const initUser = useState(initialUser);
 /* const [notExistUser, setNotExistUser] = useState(false);

  if (JSON.parse(localStorage.getItem("CURRENT_USER")).username.length <= 0) {
    setNotExistUser(false);
  } else {
    setNotExistUser(true);
  }
*/
  const goToHome = () => {
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  // if (JSON.parse(localStorage.getItem("CURRENT_USER")).username.length <= 0)
  return (
    <div className="font-roboto h-16 min-w-full flex justify-between items-center border-b px-6 bg-cyan text-white sticky top-0 z-10">
      <div className="flex flex-none justify-center items-center">
        <h1 className="text-2xl font-bold">
          <Link className="h-full flex flex-row items-center" to="/">
            <img className="w-14 h-14" src={logo} alt="logo de itako bsc" />
            <p className="px-2 truncate">e-emploi</p>
          </Link>
        </h1>
        <div className="flex justify-center items-center h-full">
          {JSON.parse(localStorage.getItem("CURRENT_USER")).username.length <=
            0 && (
            <button className="h-full text-white hover:text-slate-200">
              <Link
                className="px-6 h-full flex flex-row justify-between items-center"
                to="/login"
              >
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
                <p className=" px-2 text-lg">Connexion</p>
              </Link>
            </button>
          )}

          {!(
            JSON.parse(localStorage.getItem("CURRENT_USER")).username.length <=
            0
          ) && (
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
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
                <p className=" px-2 text-lg">
                  {currentUser ? currentUser.prenom : initUser.prenom}
                </p>
              </Popover.Button>
              <Popover.Panel className="absolute z-10 bg-cyan p-2">
                <button
                  className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2"
                  onClick={goToProfile}
                >
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
                  <p className="px-2">Votre Profil</p>
                </button>
                <button
                  className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2"
                  onClick={(e) => onLogout(e, goToHome)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="px-2">Déconnexion</p>
                </button>
              </Popover.Panel>
            </Popover>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center h-full text-sm pr-4">
        <div className="flex justify-end h-full items-center">
          <button className="h-full text-white pr-2 hover:text-slate-200 flex flex-row justify-between items-center outline-none">
            <Link to="/">Accueil</Link>
          </button>
          <Popover
            className="relative h-full"
            onMouseLeave={() => {
              setIsOpen1(false);
            }}
          >
            {() => (
              <>
                <button
                  onMouseEnter={() => {
                    setIsOpen1(true);
                  }}
                  className="h-full py-4 cursor-pointer text-white pr-4 hover:text-slate-200  flex flex-row justify-between items-center outline-none"
                >
                  Domicile
                </button>
                {isOpen1 && (
                  <Popover.Panel
                    className="absolute z-10 bg-cyan px-2 min-w-full max-w-xs truncate"
                    static
                  >
                    <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                      Services nettoyages
                    </button>
                    <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                      Services artisans
                    </button>
                  </Popover.Panel>
                )}
              </>
            )}
          </Popover>
          <Popover
            className="relative h-full"
            onMouseLeave={() => setIsOpen2(false)}
          >
            {() => (
              <>
                <button
                  onMouseEnter={() => {
                    setIsOpen2(true);
                  }}
                  className="h-full truncate py-4 cursor-pointer text-white pr-4 hover:text-slate-200  flex flex-row justify-between items-center outline-none"
                >
                  Emplois et Compétences
                </button>
                {isOpen2 && (
                  <Popover.Panel
                    className="absolute z-10 bg-cyan px-2 min-w-full max-w-xs truncate"
                    static
                  >
                    <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                      Offres d'emplois
                    </button>
                    <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                      Compétences listes
                    </button>
                  </Popover.Panel>
                )}
              </>
            )}
          </Popover>
          <Popover
            className="relative h-full"
            onMouseLeave={() => setIsOpen3(false)}
          >
            {() => (
              <>
                <button
                  onMouseEnter={() => {
                    setIsOpen3(true);
                  }}
                  className="h-full py-4 cursor-pointer text-white pr-4 hover:text-slate-200 flex flex-row justify-between items-center outline-none"
                >
                  Produits
                </button>
                {isOpen3 && (
                  <Popover.Panel
                    className="absolute right-2 z-50 bg-cyan px-2 min-w-full max-w-xs truncate"
                    static
                  >
                    <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                      Produits - Recherche
                    </button>
                  </Popover.Panel>
                )}
              </>
            )}
          </Popover>
          <Popover
            className="relative h-full"
            onMouseLeave={() => setIsOpen4(false)}
          >
            {() => (
              <>
                <button
                  onMouseEnter={() => {
                    setIsOpen4(true);
                  }}
                  className="h-full py-4 cursor-pointer text-white pr-4 hover:text-slate-200  flex flex-row justify-between items-center outline-none"
                >
                  FAQ
                </button>
                {isOpen4 && (
                  <Popover.Panel
                    className="absolute right-1 z-10 bg-cyan px-2 pt-4 min-w-full max-w-xs truncate"
                    static
                  >
                    <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                      A propos
                    </button>
                    <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                      Contact
                    </button>
                  </Popover.Panel>
                )}
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
