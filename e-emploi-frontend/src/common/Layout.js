import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ isAuth, currentUser, onLogout}) => {
  return (
    <div className="font-poppins relative">
      <Navbar isAuth={isAuth} currentUser={currentUser} onLogout={onLogout}/>
      <div className="min-w-full bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
