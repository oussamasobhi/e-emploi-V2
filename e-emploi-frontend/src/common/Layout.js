import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../util/APIUtils";

const Layout = ({
  currentUser,
  onLogout,
}) => {
  const navigate = useNavigate()
  const [isOpenDemande, setIsOpenDemande] = useState(false);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const loadCategorie = async () => {
        try{
            const res = await getCategories();
            setCategories(res);
        }catch(error){
            console.log(error)
        }
    }
    loadCategorie();    
  }, [])
  

  return (
    <>
    <Box className="font-poppins flex flex-col h-screen bg-white" sx={{position:"relative"}}>
      <Header
        logout={onLogout}
        currentUser={currentUser}
        className="flex-none"
        demander={()=>setIsOpenDemande(true)}
      />

      <Box className="min-w-full h-[560px] overflow-y-auto flex flex-col justify-between" sx={{position:"absolute", top:"70px"}}>
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
  <Box className="h-[575px]" sx={{fontFamily:"Poppins"}}>
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
    <h2 id="modal-title">Demande d'une service</h2>
    <p id="modal-description">Choisissez la catégorie de votre demande</p>
    <Box className="grid grid-cols-2 gap-2 max-w-[765px]" >
      {categories?.map((cat, index) => (
        <Box key={index} className='hover:bg-blue-50 font-wix text-blue-700 transition-colors ease-in-out cursor-pointer h-12 flex items-center justify-center' onClick={()=>{
          navigate("/categorie/"+cat.id);
          setIsOpenDemande(false);
          }} >
          {cat.nom_categorie}
        </Box>
      )) }
    </Box>
    <Box className="flex justify-end">
    <Button onClick={()=>setIsOpenDemande(false)}>Close</Button>
    </Box>
  </Box>
  </Box>
</Modal>

    </>
  );
};

export default Layout;
