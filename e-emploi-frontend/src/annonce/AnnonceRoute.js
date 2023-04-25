import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import LayoutAnnonceDetail from "./LayoutAnnonceDetail";
import AnnonceDetail from "./AnnonceDetail";
import { useParams } from "react-router";
import { getAnnonceById } from "../util/APIUtils";
import { useState } from "react";
import ChatRoom from "./ChatRoom";

const AnnonceRoute = ({ currentUser }) => {
  const [annonce, setAnnonce] = useState({
    userResponse: {
      username: "",
    },
  });
  const idAnnonce = useParams().id;
  useEffect(() => {
    const loadAnnonce = async () => {
      try {
        const _annonce = await getAnnonceById(idAnnonce);
        console.log(_annonce);
        setAnnonce(_annonce);
      } catch (error) {
        console.log(error);
      }
    };
    if (idAnnonce) loadAnnonce();
    console.log(annonce);
  }, []);
  useEffect(() => {
    // console.log(idAnnonce);
    const loadAnnonce = async () => {
      try {
        const _annonce = await getAnnonceById(idAnnonce);
        setAnnonce(_annonce);
      } catch (error) {
        console.log(error);
      }
    };
    if (idAnnonce) loadAnnonce();
    console.log(annonce);
  }, [idAnnonce]);

  if (!annonce) return <p>Loading...</p>;
  else
    return (
      <Routes>
        <Route path="/*" element={<LayoutAnnonceDetail />}>
          <Route index element={<AnnonceDetail currentUser={currentUser} />} />
          <Route
            path=":username"
            element={<ChatRoom annonce={annonce} currentUser={currentUser} />}
          />
        </Route>
      </Routes>
    );
};

export default AnnonceRoute;
