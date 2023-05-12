import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  setIsLoading,
  isAuth,
  currentUser,
  onLogout,
  current,
  setCurrent,
  onClick,
}) => {
  return (
    <div className="font-poppins flex flex-col h-screen relative">
      <Header
        logout={onLogout}
        currentUser={currentUser}
        className="flex-none"
      />

      <div className="min-w-full shrink max-h-135 overflow-y-auto grow-0 absolute top-16">
        <Outlet />
        <Footer/>
      </div>
      
    </div>
  );
};

export default Layout;
