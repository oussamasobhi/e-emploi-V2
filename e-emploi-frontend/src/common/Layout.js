import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

const Layout = ({
  currentUser,
  onLogout,
}) => {
  const [isOpenDemande, setIsOpenDemande] = useState(false);
  
  return (
    <>
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
    </Box>
    
<Modal
  open={isOpenDemande}
  onClose={()=>setIsOpenDemande(false)}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
    <h2 id="modal-title">Modal Title</h2>
    <p id="modal-description">Modal Content</p>
    <Button onClick={()=>setIsOpenDemande(false)}>Close</Button>
  </Box>
</Modal>

    </>
  );
};

export default Layout;
