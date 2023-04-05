import React from "react";
import LayoutES from "./LayoutES";
import ESContent from "./ESContent";
import Emploi from "./emploi/Emploi";
import Service from "./service/Service";
import { Routes, Route } from "react-router";

const EmploiService = () => {
  return (
    <Routes>
      <Route path="/*" element={<LayoutES />}>
        <Route index element={<ESContent />} />
        <Route path="emploi" element={<Emploi />} />
        <Route path="service" element={<Service />} />
      </Route>
    </Routes>
  );
};

export default EmploiService;
