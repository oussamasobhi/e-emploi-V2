import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

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
    <div className="font-poppins relative">
      <Navbar
        setIsLoading={setIsLoading}
        isAuth={isAuth}
        currentUser={currentUser}
        onLogout={onLogout}
        current={current}
        setCurrent={setCurrent}
        onClick={onClick}
      />
      <div className="min-w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
