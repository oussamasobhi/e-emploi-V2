import React from "react";
import { Link} from "react-router-dom";

import { Typography } from "antd";

const Hero = () => {
  return (
    <div className="h-114 pt-12 ">
      <div className="h-full flex flex-col items-center justify-around">
        <div className="h-9/12 w-full">
          <div className="flex flex-col items-center mb-16">
            <Typography className="font-archivo text-5xl lg:text-7xl text-center">
              Décrivez-nous votre besoin
            </Typography>
            <Typography className="font-archivo text-5xl lg:text-7xl text-center flex justify-center bg-gradient-to-r text-transparent bg-clip-text from-orange-700 to-orange-400">
              Pour réaliser votre projet
            </Typography>
          </div>
          <p className="text-center px-14 text-gray-600 text-xl font-roboto">
            La plateforme propose une gestion des compétences, les produits
            destinés à servir d'autre personne contre une paie.
          </p>
          <div className="grid grid-cols-2 pt-12">
            <button className="cursor-pointer bg-orange-600 hover:bg-orange-700 border-none rounded-lg mr-5 text-lg py-4 px-2 font-semibold justify-self-end transition-colors duration-300 ease-in-out w-52 ">
              <Link to={"/annonce"} className="text-white no-underline" >Voir les annonces</Link>
            </button>

            <button className="cursor-pointer bg-blue-800 hover:bg-blue-900 border-none rounded-lg text-lg py-4 px-2 font-semibold transition-colors duration-300 ease-in-out w-52">
              <Link className="text-white no-underline" >Contacter</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
