import React from "react";
import { Route, Routes } from "react-router";
import LayoutAnnonce from "./LayoutAnnonce";
import CreateAnnonce from "./CreateAnnonce";
import Annonce from "../otherProfile/annonces/Annonce";
import AnnonceDetail from "./AnnonceDetail";
import ChatBox from "./ChatBox";
import Chat from "../chat/Chat";

const Annonces = ({ notify, currentUser }) => {
  return (
    <Routes>
      <Route path="/*" element={<LayoutAnnonce />}>
        <Route path="create" element={<CreateAnnonce notify={notify} />} />
        <Route index element={<Annonce currentUser={currentUser} />} />
        <Route path=":id/*" element={<AnnonceDetail currentUser={currentUser} />} >
          <Route path="message" element={<ChatBox />} />
        </Route>
        
      </Route>
    </Routes>
  );
};

export default Annonces;
