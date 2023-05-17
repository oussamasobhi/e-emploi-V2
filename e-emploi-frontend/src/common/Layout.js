import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = ({
  currentUser,
  onLogout,
}) => {
  return (
    <Box className="font-poppins flex flex-col h-screen bg-gray-100" sx={{position:"relative"}}>
      <Header
        logout={onLogout}
        currentUser={currentUser}
        className="flex-none"
      />

      <Box className="min-w-full h-myHeight overflow-y-auto flex flex-col justify-between" sx={{position:"absolute", top:"70px"}}>
        <div>
          <Outlet className="min-h-full " />
        </div>
        {/*<Footer className="justify-self-end" />*/}
      </Box>
      
    </Box>
  );
};

export default Layout;
