import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getAllAnnonces, getSousCategories, getSousCategory } from '../util/APIUtils';
import { myTheme } from '../theme';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { addAnnonceUser } from '../util/APIUtils';
import { message } from 'antd';
const options = { day: 'numeric', month: 'long', year: 'numeric', locale: 'fr' };
const formatter = new Intl.DateTimeFormat('fr', options);

const DemandeCarte = ({demande, setDemandes}) => {
    const navigate = useNavigate();
    const [nbOffre, setNbOffre] = useState(null);
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
        const nb = demande?.annonceUsers?.length;
        if(demande?.annonceUsers?.some(obj => obj?.id?.iduser === JSON.parse(localStorage.getItem("CURRENT_USER")).id)){
          setNbOffre(nb-1);
        }else{
          setNbOffre(nb);
        }
       console.log(demande?.annonceUsers?.some(obj => obj.id === JSON.parse(localStorage.getItem("CURRENT_USER")).id));
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
          loadDemandes();
          setIsOpenPostule(false);
        }catch(error){
          message.error({
            content:"Postulation échouée",
            className:"relative top-16"
          });
          console.log(error);
        }
      }
      const loadDemandes = async () => {
        try{
            const res = await getAllAnnonces();
            setDemandes(res);
        }catch(error){
            console.log(error);
        }
      }

      useEffect(() => {
      console.log(demande?.userResponse?.username);
      console.log(JSON.parse(localStorage.getItem("CURRENT_USER")).username);
      console.log(demande?.annonceUsers.some(obj => obj?.id?.iduser === JSON.parse(localStorage.getItem("CURRENT_USER")).id));
      }, [demande])
      
      
    if(!sousCat || !demande ){
        return <Typography variant='body1' >Loading...</Typography>
    }
  return (
    <>
    <Box key={demande.id} className='p-8 bg-white rounded-md border-1 grid lg:grid-cols-2 gap-6 mb-4' sx={{border:1, borderColor:"#cccccc"}}>
        <Box>
          <Box className="h-40 bg-lime-300 rounded-md flex justify-center items-center overflow-hidden">
          <img src={require("../public/image_sc/sc"+demande.categorie1Annonce+".jpg")} className="h-full w-full object-cover" />
          </Box>
            <Typography variant='h6' sx={{fontFamily:"Poppins", fontWeight:"bold"}} className="mt-2" >{sousCat.nom_sous_categorie} </Typography>
          <Typography variant='body1' sx={{color:'#555555'}} ><span className='font-wix' >{formatter.format(new Date(demande.date))} ({demande.duree}) </span> </Typography>
        </Box>
        {demande?.userResponse?.username === JSON.parse(localStorage.getItem("CURRENT_USER")).username 
        &&
        <Box className="mt-3 lg:mt-0">
          <Divider className='lg:hidden' />
          <Typography variant='body1' sx={{ color:'#555555'}} className='py-4' gutterBottom><span className='font-wix'>Vous n'avez pas reservé de prestataire</span> </Typography>
          <Divider/>
          {nbOffre!==null && <Box className="rounded-xl bg-blue-100 flex mt-4 pl-3 text-blue-700 items-center" sx={{height:"96px"}} >
            {nbOffre>0 && <span> Vous avez reçu {nbOffre} offre(s)</span>}
            {nbOffre<=0 && <span> Aucune offre reçue jusqu'ici</span>}
          </Box>}
        </Box> }    
        {demande?.userResponse?.username !== JSON.parse(localStorage.getItem("CURRENT_USER")).username 
        &&
        <Box className="mt-3 lg:mt-0">
          <Box className="flex items-center mr-6">
            <Box className="bg-blue-200 rounded-full flex justify-center items-center mr-2" sx={{padding:"6px"}} >
              <LocationOnRoundedIcon sx={{color:myTheme.palette.blue.second}} />
            </Box>
            <Typography variant='body1' sx={{fontFamily:"Poppins"}}>
              {demande.adresse.suplementaire!=="" && <span className='text-gray-800 '>{demande.adresse.suplementaire},&nbsp; </span>}
              {demande.adresse.quartier!=="" && <span className='text-gray-800 '>{demande.adresse.quartier},&nbsp; </span>}
              {demande.adresse.ville!=="" && <span className='text-gray-800 '>{demande.adresse.ville} </span>}
              </Typography>
          </Box>
          <Box className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          <Box className="my-3">
            <Typography variant='subtitle1' sx={{fontFamily:"Poppins", fontWeight:"bold"}} >Détails</Typography>
            <Typography variant='body1'>{demande?.infos_complementaire} </Typography>
          </Box>
          <Box className="">
          <Typography variant="subtitle1" gutterBottom><span className='font-bold font-poppins'>Données personnelles</span></Typography>
          
            <Box className="flex items-start">
            <LocalPhoneOutlinedIcon sx={{color:myTheme.palette.blue.second, marginRight:"12px"}} />
            <Box className="flex flex-col">
              <Typography variant="body2" sx={{fontFamily:"Wix Madefor Display"}}>Numéro téléphone</Typography>
              <Typography variant="body2" sx={{fontFamily:"Poppins"}}>{demande.userResponse.num_tel} </Typography>
            </Box>
            </Box>
           
          </Box>
          </Box>

        </Box> } 
        {demande?.userResponse?.username===JSON.parse(localStorage.getItem("CURRENT_USER")).username &&
         <Button onClick={()=>gererDemande(demande.id)} variant='contained' sx={{width:"100%", borderRadius: "12px", paddingY:"12px", marginTop:"14px"}} className='mt-4'><span className='capitalize font-poppins' >Gérer&nbsp;</span><span className='lowercase font-poppins' >ma demande</span>
         </Button>
        }
        {(demande?.userResponse?.username!==JSON.parse(localStorage.getItem("CURRENT_USER")).username && demande?.statusAnnonce !== "Terminé" &&
        (!(demande?.annonceUsers.some(obj => obj?.id?.iduser == JSON.parse(localStorage.getItem("CURRENT_USER")).id)) || demande?.annonceUsers.length ===0 )) &&
         <Button onClick={()=>setIsOpenPostule(true)} variant='contained' sx={{width:"100%", borderRadius: "12px", paddingY:"12px", marginTop:"14px"}} className='mt-4'><span className='capitalize font-poppins' >Postuler</span></Button> 
        }
        {(demande?.userResponse?.username!==JSON.parse(localStorage.getItem("CURRENT_USER")).username &&
        demande?.statusAnnonce === "Terminé") &&
         <Typography variant='body1'><span className='font-wix text-red-600'>Annonce déjà clôturée</span> </Typography> 
        }
         {(demande?.userResponse?.username!==JSON.parse(localStorage.getItem("CURRENT_USER")).username &&
        demande?.annonceUsers.some(obj => obj?.id?.iduser == JSON.parse(localStorage.getItem("CURRENT_USER")).id) && demande?.statusAnnonce !== "Terminé" ) &&
         <Typography variant='body1'><span className='font-wix'>Vous avez déjà postulé à cette annonce.&nbsp; <span onClick={()=>navigate("/dboard/chat/"+demande?.id+'/'+demande?.userResponse?.username)} className='font-poppins cursor-pointer font-bold text-blue-700'>Voir discussion</span> </span> </Typography> 
        }
      </Box>  
      <Modal
        open={isOpenPostule}
        onClose={()=>setIsOpenPostule(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <h2 id="modal-title">Postuler à une demande</h2>
            <p id="modal-description">Voulez-vous vraiment postuler à cette demande?</p>
            <Button onClick={()=>setIsOpenPostule(false)}>Fermer</Button>
            <Button onClick={()=>postuler()} >Confirmer</Button>
          </Box>
      </Modal>
      </>
  )
}

export default DemandeCarte