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
    <div className="font-poppins flex flex-col h-screen">
      <Navbar
        setIsLoading={setIsLoading}
        isAuth={isAuth}
        currentUser={currentUser}
        onLogout={onLogout}
        current={current}
        setCurrent={setCurrent}
        onClick={onClick}
        className="flex-none"
      />
      <div className="min-w-full shrink max-h-135 overflow-y-auto grow-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
