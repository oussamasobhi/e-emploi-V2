import React from "react";
import { Route, Routes } from "react-router";
import LayoutDomicile from "./LayoutDomicile";
import Nettoyage from "./nettoyage/Nettoyage";
import Artisan from "./artisan/Artisan";
import DomicileContent from "./DomicileContent";


const Domicile = ({currentUser}) => {
 

  return (
    <Routes>
      <Route path="/*" element={<LayoutDomicile />}>
        <Route index element={<DomicileContent currentUser={currentUser} /> } />
        <Route path="nettoyage" element={<Nettoyage currentUser={currentUser}  />} />
        <Route path="artisan" element={<Artisan currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};

export default Domicile;
