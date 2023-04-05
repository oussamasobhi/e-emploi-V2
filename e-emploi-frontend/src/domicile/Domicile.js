import React, {useEffect} from "react";
import { Route, Routes } from "react-router";
import LayoutDomicile from "./LayoutDomicile";
import Nettoyage from "./nettoyage/Nettoyage";
import Artisan from "./artisan/Artisan";
import DomicileContent from "./DomicileContent";


const Domicile = () => {
 

  return (
    <Routes>
      <Route path="/*" element={<LayoutDomicile />}>
        <Route index element={<DomicileContent/> } />
        <Route path="nettoyage" element={<Nettoyage />} />
        <Route path="artisan" element={<Artisan />} />
      </Route>
    </Routes>
  );
};

export default Domicile;
