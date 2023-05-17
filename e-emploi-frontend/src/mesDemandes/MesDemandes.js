import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LayoutMesDemandes from './LayoutMesDemandes';
import Demande from './Demande';
import { getAnnoncesByUserId } from '../util/APIUtils';

const MesDemandes = ({currentUser}) => {
  const [mesDemandes, setMesDemandes] = useState(null);
  const navigate = useNavigate();
  const handlePopstate = () => {
    
    console.log('return');
   navigate(JSON.parse(localStorage.getItem("prevUrl")));
   localStorage.removeItem("prevUrl");
  };
  window.addEventListener('popstate', handlePopstate);

  useEffect(() => {
    const loadMesDemandes = async () => {
      try{
        const res = await getAnnoncesByUserId(currentUser.id);
        setMesDemandes(res);
      }catch(error){
        console.log(error);
      }
    }
    loadMesDemandes();
  }, [currentUser])
  
  useEffect(() => {
   console.log(mesDemandes);
  }, [mesDemandes])
  

  
  return (
    <Routes>
      <Route path='/*' element={<LayoutMesDemandes/> } >
        <Route path=':id' element={<Demande/> } />
      </Route>
    </Routes>
  )
}

export default MesDemandes