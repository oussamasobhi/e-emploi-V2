import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuth, onLogout }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  }
  
  if (!isAuth)
    return (
      <div className="h-16 min-w-full  flex justify-between items-center border-b px-3">
        <h1 className="text-blue-700 text-2xl font-bold">
          <Link className="h-full" to="/">
            e-emploi
          </Link>
        </h1>
        <div className="flex justify-end items-center h-full">
          <div>
            <button className="px-6 py-2 mx-10 bg-blue-500 hover:bg-blue-700 rounded-md text-white">
              <Link className="h-full" to="/pro/signup">
                Devenir pro
              </Link>
            </button>
          </div>
          <div className="flex justify-center items-center h-full text-gray-700">
            <button className=" h-full hover:border-b-2 hover:text-black">
              <Link className="px-6 h-full" to="/signup">
                S'enregistrer
              </Link>
            </button>
            <button className="h-full hover:border-b-2 hover:text-black">
              <Link className="px-6 h-full" to="/login">
                Se connecter
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="h-16 min-w-full  flex justify-between items-center border-b px-3">
        <h1 className="text-blue-700 text-2xl font-bold">
          <Link className="h-full" to="/">
            e-emploi
          </Link>
        </h1>
        <div className="flex justify-end items-center h-full">
          <div className="flex justify-center items-center h-full text-gray-700">
            {/*<button className=" h-full hover:border-b-2 hover:text-black">
              <Link className="px-6 h-full">Menu2</Link>
            </button>
            <button className=" h-full hover:border-b-2 hover:text-black">
              <Link className="px-6 h-full">Menu2</Link>
    </button>*/}
            Put other menu here
            <button className="h-full hover:border-b-2 hover:text-black">
              <Link className="px-6 h-full" 
              onClick={(e) => onLogout(e, goToHome)}>Se deconnecter</Link>
            </button>
          </div>
        </div>
      </div>
    );
};

export default Navbar;
