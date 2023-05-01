import React from "react";
import { Navigate, Route, Routes } from "react-router";
import LayoutAnnonce from "./LayoutAnnonce";
import CreateAnnonce from "./CreateAnnonce";
import Annonce from "../otherProfile/annonces/Annonce";
import AnnonceRoute from "./AnnonceRoute";

const Annonces = ({ notify, currentUser }) => {
  if (localStorage.getItem("token") === "") return <Navigate to="/login" />;
  else
    return (
      <Routes>
        <Route path="/*" element={<LayoutAnnonce currentUser={currentUser} />}>
          <Route path="create" element={<CreateAnnonce notify={notify} />} />
          <Route index element={<Annonce currentUser={currentUser} />} />
          <Route
            path=":id/*"
            element={<AnnonceRoute currentUser={currentUser} />}
          />
        </Route>
      </Routes>
    );
};

export default Annonces;
