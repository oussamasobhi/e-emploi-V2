import { Popover } from "@headlessui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../public/image/logo_itako_bsc.jpg";

const Navbar = ({ isAuth, currentUser, onLogout }) => {
  const navigate = useNavigate();


  const goToHome = () => {
    navigate("/");
  }

  const goToProfile = () => {
    navigate("/profile");
  }

  if (!isAuth)
    return (
      <div className="h-16 min-w-full flex justify-between items-center border-b px-10 bg-cyan text-white sticky top-0">
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-2xl font-bold">
            <Link className="h-full flex flex-row items-center" to="/">
              <img className="w-14 h-14" src={logo} alt='logo de itako bsc' />
              <p className="px-2">e-emploi</p>
            </Link>
          </h1>
          <div className="flex justify-center items-center h-full">
            <button className="h-full text-white hover:text-slate-200">
              <Link className="px-6 h-full flex flex-row justify-between items-center" to="/login">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                <p className=" px-2 text-lg">Connexion</p>
              </Link>
            </button>
            <button className="px-6 py-2 mx-10 bg-white hover:bg-slate-200 rounded-md text-cyan-800">
              <Link className="h-full text-cyan" to="/pro/signup">
                Devenir pro
              </Link>
            </button>
          </div>
        </div>
        <div className="flex justify-end items-center h-full">
          <div className="flex flex-row justify between items-center">
            <button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
              Accueil
            </button>
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
                <p>Domicile</p>
              </Popover.Button>
              <Popover.Panel
                className="absolute z-10 bg-cyan p-2 mt-4 min-w-full max-w-xs truncate"
              >
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Services nettoyages
                </button>
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Services artisans
                </button>
              </Popover.Panel>
            </Popover>
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
                <p>Emplois et Compétences</p>
              </Popover.Button>
              <Popover.Panel
                className="absolute z-10 bg-cyan p-2 mt-4 min-w-full max-w-xs truncate"
              >
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Offres d'emplois
                </button>
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Compétences listes
                </button>
              </Popover.Panel>
            </Popover>
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
                <p>Produits</p>
              </Popover.Button>
              <Popover.Panel
                className="absolute z-10 bg-cyan p-2 mt-4 min-w-full max-w-xs truncate"
              >
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Produits - Recherche
                </button>
                {/*<button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Services Artisans
    </button>*/}
              </Popover.Panel>
            </Popover>
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
                <p>FAQ</p>
              </Popover.Button>
              <Popover.Panel
                className="absolute z-10 bg-cyan p-2 mt-4 min-w-full max-w-xs truncate"
              >
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  A propos
                </button>
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Contact
                </button>
              </Popover.Panel>
            </Popover>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="h-16 min-w-full flex justify-between items-center border-b px-10 bg-cyan text-white sticky top-0">
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-2xl font-bold">
            <Link className="h-full flex flex-row items-center" to="/">
              <img className="w-14 h-14" src={logo} alt='logo de itako bsc' />
              <p className="px-2">e-emploi</p>
            </Link>
          </h1>
          <Popover className="relative">
            <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              <p className=" px-2 text-lg">{currentUser.name}</p>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-cyan p-2">
              <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2" onClick={goToProfile}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                <p className="px-2">Votre Profil</p>
              </button>
              <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2" onClick={(e) => onLogout(e, goToHome)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                <p className="px-2">Déconnexion</p>
              </button>
            </Popover.Panel>
          </Popover>
        </div>

        <div className="flex justify-end items-center h-full">
          <div className="flex flex-row justify between items-center">
            <button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
              Accueil
            </button>
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
                <p>Domicile</p>
              </Popover.Button>
              <Popover.Panel
                className="absolute z-10 bg-cyan p-2 mt-4 min-w-full max-w-xs truncate"
              >
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Services nettoyages
                </button>
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Services artisans
                </button>
              </Popover.Panel>
            </Popover>
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
                <p>Emplois et Compétences</p>
              </Popover.Button>
              <Popover.Panel
                className="absolute z-10 bg-cyan p-2 mt-4 min-w-full max-w-xs truncate"
              >
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Offres d'emplois
                </button>
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Compétences listes
                </button>
              </Popover.Panel>
            </Popover>
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
                <p>Produits</p>
              </Popover.Button>
              <Popover.Panel
                className="absolute z-10 bg-cyan p-2 mt-4 min-w-full max-w-xs truncate"
              >
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Produits - Recherche
                </button>
                {/*<button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Services Artisans
    </button>*/}
              </Popover.Panel>
            </Popover>
            <Popover className="relative">
              <Popover.Button className="h-full text-white hover:text-slate-200 px-6 flex flex-row justify-between items-center outline-none">
                <p>FAQ</p>
              </Popover.Button>
              <Popover.Panel
                className="absolute z-10 bg-cyan p-2 mt-4 min-w-full max-w-xs truncate"
              >
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  A propos
                </button>
                <button className="h-full hover:text-lime w-full flex flex-row justify-start items-center py-1 px-2">
                  Contact
                </button>
              </Popover.Panel>
            </Popover>
          </div>
        </div>
      </div >
    );
};

export default Navbar;
