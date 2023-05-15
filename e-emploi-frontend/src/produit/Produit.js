import React from "react";
import { Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { getListAnnonces } from "../util/APIUtils";
import { Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AnnonceCarte from "../otherProfile/annonces/AnnonceCarte";

const Produit = () => {
  const [annonces, setAnnonces] = useState(null);
  const [filteredAnnonces, setFilteredAnnonces] = useState(null);
  useEffect(() => {
    if (annonces) {
      setFilteredAnnonces(annonces);
    }
  }, [annonces]);
  useEffect(() => {
    console.log(filteredAnnonces);
  }, [filteredAnnonces]);

  useEffect(() => {
    const loadAnnonces = async () => {
      const res = (await getListAnnonces(5)).content;
      setAnnonces(res);
    };
    loadAnnonces();
  }, []);

  const [recherche, setRecherche] = useState({
    search: "",
    min: undefined,
    max: undefined,
  });
  const handleChange = (event) => {
    const value = event.target.value;
    setRecherche({ ...recherche, [event.target.name]: value });
  };
  const onSearch = async () => {
    console.log(recherche);
    try {
      const res = (
        await getListAnnonces(
          5,
          undefined,
          undefined,
          recherche.search,
          recherche.min,
          recherche.max
        )
      ).content;
      setAnnonces(res);
    } catch (error) {
      console.log(error);
    }
  };

  //Breadcrumbs
  const itemsNameMap = {
    "/produit": "Produits",
  };
  const location = useLocation();
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
  return localStorage.getItem("token")!=="" ? (
    <div className="flex bg-gray-100 ">
      <div className="flex-auto px-5">
        <div className="flex items-center border-b border-b-gray-400 py-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="flex justify-center items-center mb-6">
          <div className="flex justify-center w-fit ring-1 ring-gray-300 rounded-xl overflow-hidden">
            <input
              onChange={handleChange}
              type="text"
              name="search"
              placeholder="mots clés"
              className={"border-0 h-10 outline-none px-4 w-36 md:w-auto"}
            />
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
              <Typography className={"text-white font-roboto hidden md:block"}>
                Rechercher
              </Typography>
            </button>
          </div>
        </div>
        {/*<Typography.Title level={3}>Domicile</Typography.Title>*/}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 px-10">
          {filteredAnnonces?.map((annonce, index) => (
            <AnnonceCarte isProfile={false} key={index} annonce={annonce} />
          ))}
        </div>
      </div>
    </div>
  ) : (<Navigate to="/login" />)
   ;
};

export default Produit;