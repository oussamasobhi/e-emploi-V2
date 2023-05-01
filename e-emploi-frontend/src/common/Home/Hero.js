import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Typography } from "antd";

const Hero = () => {
  return (
    <div className="h-114 pt-12 ">
      <div className="h-full flex flex-col items-center justify-around">
        <div className="h-9/12 w-full">
          <div className="flex flex-col items-center mb-16">
            <Typography className="font-archivo text-5xl lg:text-7xl text-center">
              Décrivez-nous votre besoin
            </Typography>
            <Typography className="font-archivo text-5xl lg:text-7xl text-center flex justify-center bg-gradient-to-r text-transparent bg-clip-text from-blue-600 to-blue-300">
              Pour réaliser votre projet
            </Typography>
          </div>
          <p className="text-center px-14 text-gray-600 text-xl font-roboto">La plateforme propose une gestion des compétences, les produits destinés à servir d'autre personne contre une paye.</p>
          <div className="flex justify-center pt-12">
            <Link to={"/annonce"}>
              <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 border-none rounded-md mr-5 text-white no-underline text-lg py-3 px-2 font-semibold transition-colors duration-300 ease-in-out">
                Voir toutes les annonces
              </button>
            </Link>
            <Link>
              <button className="cursor-pointer bg-black hover:bg-gray-800 border-none rounded-md text-white no-underline text-lg py-3 px-2 font-semibold transition-colors duration-300 ease-in-out">
                Trouvez votre artisan
              </button>
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
