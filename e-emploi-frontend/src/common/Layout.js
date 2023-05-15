import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  currentUser,
  onLogout,
}) => {
  return (
    <div className="font-poppins flex flex-col h-screen relative bg-gray-100">
      <Header
        logout={onLogout}
        currentUser={currentUser}
        className="flex-none"
      />

      <div className="min-w-full h-myHeight overflow-y-auto absolute top-16 flex flex-col justify-between">
        <Outlet className="min-h-full " />
        <Footer className="" />
      </div>
      
    </div>
  );
};

export default Layout;
