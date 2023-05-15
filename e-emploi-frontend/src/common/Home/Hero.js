import React from "react";
import { Link} from "react-router-dom";

import { Typography } from "antd";

const Hero = () => {
  
  return (
    <div className="h-myHeight pt-12 ">
      <div className="h-full flex flex-col items-center ">
        <div className="h-9/12 w-full">
          <div className="flex flex-col items-center my-16">
            <Typography className="font-archivo text-5xl lg:text-7xl text-center">
              Décrivez-nous votre besoin
            </Typography>
            <Typography className="font-archivo text-5xl lg:text-7xl text-center flex justify-center bg-gradient-to-r text-transparent bg-clip-text from-my-blue to-sky-300">
              Pour réaliser votre projet
            </Typography>
          </div>
          <p className="text-center px-14 pt-14 text-gray-600 text-xl font-roboto">
            La plateforme propose une gestion des compétences, les produits
            destinés à servir d'autre personne contre une paie.
          </p>
          <div className="grid grid-cols-2 pt-20">
            <button className="cursor-pointer bg-my-blue border-none rounded-md mr-5 text-lg py-4 px-2 font-roboto uppercase justify-self-end transition-colors duration-300 ease-in-out w-52 ">
              <Link to={"/annonce"} className="text-orange-500 no-underline" >Voir les annonces</Link>
            </button>

            <button className="cursor-pointer bg-my-blue border-none rounded-md text-lg py-4 px-2 font-roboto uppercase transition-colors duration-300 ease-in-out w-52">
              <Link className="text-orange-500 no-underline" >Contacter</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
