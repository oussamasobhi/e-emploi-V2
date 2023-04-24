import React from "react";
import { Route, Routes } from "react-router";
import LayoutAnnonce from "./LayoutAnnonce";
import CreateAnnonce from "./CreateAnnonce";
import Annonce from "../otherProfile/annonces/Annonce";
import AnnonceRoute from "./AnnonceRoute";

const Annonces = ({ notify, currentUser }) => {
  return (
    <Routes>
      <Route path="/*" element={<LayoutAnnonce />}>
        <Route path="create" element={<CreateAnnonce notify={notify} />} />
        <Route index element={<Annonce currentUser={currentUser} />} />
        <Route path=":id/*" element={<AnnonceRoute currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};

export default Annonces;
