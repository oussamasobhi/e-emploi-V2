import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ isAuth, currentUser, onLogout}) => {
  return (
    <div className="font-poppins">
      <Navbar isAuth={isAuth} currentUser={currentUser} onLogout={onLogout}/>
      <div className="flex justify-center bg-gray-50 pt-6 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
