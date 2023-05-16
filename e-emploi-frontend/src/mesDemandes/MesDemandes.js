import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MesDemandes = () => {
  const navigate = useNavigate();
  const handlePopstate = () => {
    
    console.log('return');
   navigate(JSON.parse(localStorage.getItem("prevUrl")));
   localStorage.removeItem("prevUrl");
  };
  window.addEventListener('popstate', handlePopstate);

  
  return (
    <div>MesDemandes</div>
  )
}

export default MesDemandes