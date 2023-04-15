import React from "react";
import LayoutES from "./LayoutES";
import ESContent from "./ESContent";
import Emploi from "./emploi/Emploi";
import Service from "./service/Service";
import { Routes, Route } from "react-router";

const EmploiService = ({currentUser}) => {
  return (
    <Routes>
      <Route path="/*" element={<LayoutES />}>
        <Route index element={<ESContent currentUser={currentUser} />} />
        <Route path="emploi" element={<Emploi currentUser={currentUser} />} />
        <Route path="service" element={<Service currentUser={currentUser} />} />
      </Route> 
    </Routes>
  );
};

export default EmploiService;
