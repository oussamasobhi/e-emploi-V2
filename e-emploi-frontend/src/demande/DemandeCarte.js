import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getSousCategories, getSousCategory } from '../util/APIUtils';
import { addAnnonceUser } from '../util/APIUtils';
import { message } from 'antd';
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const DemandeCarte = ({demande}) => {
    const navigate = useNavigate();
    const [postule, setPostule] = useState({
      idannonce : demande.id,
      duree_prop_real: "",
      tarif_nego:""
    });
    const [isOpenPostule, setIsOpenPostule] = useState(false);
    const [sousCat, setSousCat] = useState(null);
    const gererDemande = (id) => {
        navigate("/demande/"+id)
      }

      useEffect(() => {
        console.log(demande);
        const loadSouscategorie = async () => {
            try{
                const res = await getSousCategory(demande.categorie1Annonce);
                setSousCat(res);
            }catch(error){
                console.log(error);
            }
        }
        loadSouscategorie();
      }, [demande])
      useEffect(() => {
       console.log(sousCat);
      }, [sousCat])

      const postuler = async () => {
        try{
          const res = await addAnnonceUser(postule);
          console.log(res);
          message.success({
            content:"Postulation effectuée",
            className:"relative top-16"
          });
          setIsOpenPostule(false);
        }catch(error){
          message.error({
            content:"Postulation échouée",
            className:"relative top-16"
          });
          console.log(error);
        }
      }

      
      
    if(!sousCat || !demande){
        return <Typography variant='body1' >Loading...</Typography>
    }
  return (
    <>
    <Box key={demande.id} className='p-8 rounded-md border-1 grid lg:grid-cols-2 gap-6 mb-4' sx={{border:1, borderColor:"#cccccc"}}>
        <Box>
          <Box className="h-40 bg-lime-300 rounded-md flex justify-center items-center">
          photo
          </Box>
            <Typography variant='h6' sx={{fontFamily:"Poppins", fontWeight:"bold"}} className="mt-2" >{sousCat.nom_sous_categorie} </Typography>
          <Typography variant='body1' sx={{color:'#555555'}} ><span className='font-wix' >{formatter.format(new Date(demande.date))} </span> </Typography>
        </Box>
        <Box className="mt-3 lg:mt-0">
          <Divider className='lg:hidden' />
          <Typography variant='body1' sx={{ color:'#555555'}} className='py-4' gutterBottom><span className='font-wix'>Vous n'avez pas reservé de prestataire</span> </Typography>
          <Divider/>
          <Box className="rounded-xl bg-blue-100 flex mt-4" sx={{height:"96px"}} >
          </Box>
        </Box>     
        {demande?.userResponse?.username===JSON.parse(localStorage.getItem("CURRENT_USER")).username &&
         <Button onClick={()=>gererDemande(demande.id)} variant='contained' sx={{width:"100%", borderRadius: "12px", paddingY:"12px", marginTop:"14px"}} className='mt-4'><span className='capitalize font-poppins' >Gérer&nbsp;</span><span className='lowercase font-poppins' >ma demande</span></Button>}
          {demande?.userResponse?.username!==JSON.parse(localStorage.getItem("CURRENT_USER")).username &&
         <Button onClick={()=>setIsOpenPostule(true)} variant='contained' sx={{width:"100%", borderRadius: "12px", paddingY:"12px", marginTop:"14px"}} className='mt-4'><span className='capitalize font-poppins' >Postuler</span></Button>}
      </Box>  
      <Modal
        open={isOpenPostule}
        onClose={()=>setIsOpenPostule(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">Postuler sur une demande</h2>
            <p id="modal-description">Voulez-vous vraiment postuler à cette demande?</p>
            <Button onClick={()=>setIsOpenPostule(false)}>Fermer</Button>
            <Button onClick={()=>postuler()} >Confirmer</Button>
          </Box>
      </Modal>
      </>
  )
}

export default DemandeCarte