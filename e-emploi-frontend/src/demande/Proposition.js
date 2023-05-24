import React, { useEffect, useState } from 'react'
import { getAnnonceById, getSousCategories, getSousCategory } from '../util/APIUtils';
import { Typography } from '@mui/material';

const Proposition = ({proposition, currentUser}) => {
  const [categorie, setCategorie] = useState(null);
  const [postulation, setPostulation] = useState(null);

   useEffect(() => {
      console.log(proposition);
      const loadCategorie = async () => {
        try{
          const res = await getSousCategory(proposition.categorie1Annonce);
          setCategorie(res);
        }catch(error){
          console.log(error);
        }
      }
      if(proposition){
        loadCategorie();
      }
      const annonceUser = proposition?.annonceUsers.find(item =>
        item.id.iduser==currentUser.id && item.id.idannonce==proposition.id)
      setPostulation(annonceUser);
    }, [proposition]);
    
     
    
  if(!categorie && !proposition && !postulation) return <Typography variant='body1' >Loading...</Typography>
  return (
    <tr>
      <td>{proposition?.id} </td>
      <td>{categorie?.nom_sous_categorie}  </td>
      <td>{proposition?.userResponse.prenom + " "+ proposition?.userResponse.nom} </td>
      <td>{postulation?.statusReservation} </td>      
    </tr>
  )
}

export default Proposition