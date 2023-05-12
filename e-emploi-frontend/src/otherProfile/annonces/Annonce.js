import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getListAnnonces, getSousCategories } from "../../util/APIUtils";
import {
  Typography
} from "antd";
import { useParams } from "react-router-dom";
import {
  SearchOutlined,
} from "@ant-design/icons";
import AnnonceCarte from "./AnnonceCarte";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

const Annonce = ({ currentUser }) => {
  const [annonces, setAnnonces] = useState(null);
  const [filteredAnnonces, setFilteredAnnonces] = useState(null);
  const { username } = useParams();
  const [isProfile, setIsProfile] = useState(false);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    if (username) {
      setIsProfile(true);
    }
  }, [username]);

  useEffect(() => {
    if (annonces) {
      if (isProfile) {
        let annoncesToShow = annonces.filter(function (annonce) {
          return annonce.userResponse.username === username;
        });
        setFilteredAnnonces(annoncesToShow);
      } else {
        setFilteredAnnonces(annonces);
      }
    }
  }, [annonces, currentUser.username, username, isProfile]);

  useEffect(() => {
    const loadAnnonces = async () => {
      const res1 = (await getListAnnonces(1)).content;
      const res2 = (await getListAnnonces(2)).content;
      const res3 = (await getListAnnonces(3)).content;
      const res4 = (await getListAnnonces(4)).content;
      const res5 = (await getListAnnonces(5)).content;
      setAnnonces(res1.concat(res2).concat(res3).concat(res4).concat(res5));
    };
    loadAnnonces();
  }, []);

 
  if (filteredAnnonces) console.log(filteredAnnonces);

  //recherche
  const [recherche, setRecherche] = useState({
    search: "",
    min: undefined,
    max: undefined,
    categorie: null,
  });
  const handleChange = (event) => {
    const value = event.target.value;
    setRecherche({ ...recherche, [event.target.name]: value });
  };
  const onSearch = async () => {
    console.log(recherche)
    try {
      if (recherche.categorie) {
        const res = (
          await getListAnnonces(
            recherche.categorie,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        setAnnonces(res);
      } else {
        const res1 = (
          await getListAnnonces(
            1,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        const res2 = (
          await getListAnnonces(
            2,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        const res3 = (
          await getListAnnonces(
            3,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        const res4 = (
          await getListAnnonces(
            4,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        const res5 = (
          await getListAnnonces(
            5,
            undefined,
            undefined,
            recherche.search,
            recherche.min,
            recherche.max
          )
        ).content;
        setAnnonces(res1.concat(res2).concat(res3).concat(res4).concat(res5));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loadCategories = async () => {
      const _souscat1 = await getSousCategories (1);
      const _souscat2 = await getSousCategories(2);
      const _souscat3 = await getSousCategories(3);
      setCategories(_souscat1.concat(_souscat2).concat(_souscat3));
    };
    loadCategories();
  }, []);

  return (
    <div className="px-4 bg-gray-100 rounded-md  shadow-md">
      
      <div className="flex justify-center items-center mb-6">
        <div className="flex justify-center w-fit ring-1 ring-gray-300 rounded-xl overflow-hidden">
          <input
            onChange={handleChange}
            type="text"
            name="search"
            placeholder="mots clés"
            className={"border-0 h-10 outline-none "+(isProfile?"px-1 w-32":"px-4 w-36 md:w-auto")}
          />
          <select
          defaultValue={""}
            onChange={handleChange}
            name="categorie"
            placeholder="Catégorie"
            className="appearance-none h-10 bg-white border-0 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          >
            <option value=""  className="text-gray-500">
              Tous les catégories
            </option>
            {categories?.map((categorie, index) => (
              <option
                key={index}
                value={categorie.id}
                className="hover:bg-white"
              >
                {categorie.nom_sous_categorie}
              </option>
            ))}
          </select>

          <input
            onChange={handleChange}
            type="number"
            id="tarif_min"
            name="min"
            min="0"
            max="5000"
            className="appearance-none border-0 pl-3 h-10 focus:outline-none"
            placeholder="Tarif min"
          />
          <input
            onChange={handleChange}
            type="number"
            id="tarif_max"
            name="max"
            min="0"
            max="5000"
            className="appearance-none border-0 pl-3 h-10 focus:outline-none"
            placeholder="Tarif max"
          />
          <button
            onChange={handleChange}
            onClick={onSearch}
            className="border-0 transition-colors ease-in-out h-10 cursor-pointer rounded-r flex justify-between items-center font-caption bg-blue-500 hover:bg-blue-600 text-white"
          >
            <SearchOutlined className="mr-1" />
            <Typography className={"text-white font-roboto " + (isProfile?"hidden":"hidden md:block")}>Rechercher</Typography>
          </button>
        </div>
      </div>

      {/*<Table dataSource={filteredAnnonces} columns={nettoyageColumns} />*/}
      {!isProfile && <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 px-10">
        {filteredAnnonces?.map((annonce, index) => (
          <AnnonceCarte isProfile={isProfile} key={index} annonce={annonce} />
        ))}
      </div>}
      {isProfile && <div className="px-4">
        {filteredAnnonces?.map((annonce, index) => (
          <AnnonceCarte key={index} annonce={annonce} />
        ))}
      </div>}
    </div>
  );
};

export default Annonce;
