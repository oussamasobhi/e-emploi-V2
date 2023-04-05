import React from "react";
import { useNavigate } from "react-router-dom";

import NavAnt from "./NavAnt";

const Navbar = ({ isAuth, currentUser, onLogout, setIsLoading }) => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className=" sticky top-0 z-10">
      <NavAnt
        goToHome={goToHome}
        currentUser={currentUser}
        goToProfile={goToProfile}
        logout={onLogout}
      />
    </div>
  );
};

export default Navbar;
