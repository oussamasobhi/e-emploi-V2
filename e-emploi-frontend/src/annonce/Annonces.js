import React from "react";
import { Route, Routes } from "react-router";
import LayoutAnnonce from "./LayoutAnnonce";
import CreateAnnonce from "./CreateAnnonce";
import Annonce from "../otherProfile/annonces/Annonce";
import AnnonceDetail from "./AnnonceDetail";

const Annonces = ({ notify, currentUser }) => {
  return (
    <Routes>
      <Route path="/*" element={<LayoutAnnonce />}>
        <Route path="create" element={<CreateAnnonce notify={notify} />} />
        <Route index element={<Annonce currentUser={currentUser} />} />
        <Route path=":id" element={<AnnonceDetail />} />
      </Route>
    </Routes>
  );
};

export default Annonces;
