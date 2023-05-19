import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import DemandeModal from "./Home/DemandeModal";
import { useState } from "react";

const Layout = ({
  currentUser,
  onLogout,
}) => {
  const [isOpenDemande, setIsOpenDemande] = useState(true);
  return (
    <Box className="font-poppins flex flex-col h-screen bg-gray-100" sx={{position:"relative"}}>
      <Header
        logout={onLogout}
        currentUser={currentUser}
        className="flex-none"
        demander={()=>setIsOpenDemande(true)}
      />

      <Box className="min-w-full h-myHeight overflow-y-auto flex flex-col justify-between" sx={{position:"absolute", top:"70px"}}>
        <div>
          <Outlet className="min-h-full " />
        </div>
        {/*<Footer className="justify-self-end" />*/}
      </Box>
      <DemandeModal isOpenDemande={isOpenDemande} setIsOpenDemande={setIsOpenDemande} />
      
    </Box>
  );
};

export default Layout;
