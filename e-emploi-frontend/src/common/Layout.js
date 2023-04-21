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
    <div className="font-poppins flex flex-col">
      <Navbar
        setIsLoading={setIsLoading}
        isAuth={isAuth}
        currentUser={currentUser}
        onLogout={onLogout}
        current={current}
        setCurrent={setCurrent}
        onClick={onClick}
      />
      <div className="min-w-full sticky bottom-0 top-12 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
