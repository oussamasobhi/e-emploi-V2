import { Avatar, Box, Button, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@emotion/react';
import { accepterOffre, getAnnonceById, userGetUserById} from '../util/APIUtils';
import { useNavigate } from 'react-router';
import { message } from 'antd';

const Offre = ({postulation, demande, setDemande}) => {
  const theme = useTheme();
  const [isOpenAccept, setIsOpenAccept] = useState(null);
  const [pro, setPro] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loadProfessional = async () => {
      try{
        const res = await userGetUserById(postulation?.id?.iduser);
        setPro(res);
      }catch(error){
        console.log(error);
      }
    }
    if(postulation) loadProfessional();
  }, [postulation])
  
  useEffect(() => {
    console.log(pro)
  }, [pro])
  const reloadDemande = async () => {
      try{
        const res = await getAnnonceById(postulation?.id?.idannonce);
        setDemande(res);
      }catch(error){
        console.log(error);
      }
  }
  
  const accepter = async () => {
    try{
      const res = await accepterOffre(postulation?.id?.idannonce, postulation?.id?.iduser);
      console.log(res);
      message.info({
        content: "Vous avez accepté cet offre",
        className: "relative top-16"
      })
      reloadDemande();
    }catch(error){
      console.log(error);
    }
    setIsOpenAccept(false);
  }
  useEffect(()=>{
    console.log(postulation);
  },[postulation])


  if(!pro) return <p>Loading...</p>
  return (
    <>
    <Box className='rounded-md border-1 p-2 lg:grid-cols-2 mb-4 max-w-620 flex ' sx={{border:1, borderColor:"#cccccc"}}>
          <Box className="lg:mr-2" sx={{width: '96px', // Equivalent to w-24 in Tailwind CSS
             [theme.breakpoints.up('lg')]: {
             width: '80px', // Equivalent to lg:w-16 in Tailwind CSS
              height: '80px'
           },}}>
           <Avatar
            alt="Photo de profil"        
            sx={{width:"80px", height:"80px"}}
            
             ><PersonIcon sx={{width:"60%",height:"60%"}} /></Avatar>
          </Box>
          <Box className="grow">
            <Box>
                <Box className='flex justify-between mb-2' >
                  <Box>
                  <Typography variant="h6" sx={{fontFamily:"Poppins", fontWeight:"bold"}} > {pro.prenom} {pro.nom} </Typography>
                  <Typography variant="body2" sx={{fontFamily:"Wix Madefor Display"}}><span className='text-gray-600'> {pro.num_tel}</span> </Typography>
                  </Box>
                  <Typography variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold"}}><span className='text-green-500 font-poppins' >{postulation?.statusReservation} </span></Typography>    
              </Box>
              
            </Box>
            <Box className="flex justify-end gap-2">
              {postulation?.statusReservation==="Standard" && <Button onClick={() => setIsOpenAccept(true)} >Accepter</Button>}
              <Button onClick={() => navigate("/dboard/chat/"+postulation?.id?.idannonce+"/"+pro?.username)} >Message</Button>
            </Box>
          </Box>
        
        </Box>
        <Modal
        open={isOpenAccept}
        onClose={()=>setIsOpenAccept(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">Postuler à une demande</h2>
            <p id="modal-description">Voulez-vous vraiment postuler à cette demande?</p>
            <Button onClick={()=>setIsOpenAccept(false)}>Fermer</Button>
            <Button onClick={()=>accepter()} >Confirmer</Button>
          </Box>
      </Modal>
        </>
  )
}

export default Offre