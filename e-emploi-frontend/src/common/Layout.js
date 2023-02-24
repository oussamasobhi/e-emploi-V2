import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ isAuth, onLogout}) => {
  return (
    <>
      <Navbar isAuth={isAuth} onLogout={onLogout}/>
      <div className="flex justify-center bg-gray-50 pt-6 ">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
