import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ setIsLoading, isAuth, currentUser, onLogout}) => {
  return (
    <div className="font-poppins relative">
      <Navbar setIsLoading={setIsLoading} isAuth={isAuth} currentUser={currentUser} onLogout={onLogout}/>
      <div className="min-w-full bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
