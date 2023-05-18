import React, { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router'
import DemandeLayout from './DemandeLayout';
import Demande from './Demande';

const DemandeRoute = () => {
    const {id} = useParams();
    useEffect(() => {
     console.log(id);
    }, [id])
    
  return (
    <Routes>
        <Route path='/*' element={<DemandeLayout/> } >
            <Route index element={<Demande/> } />
        </Route>
    </Routes>
  )
}

export default DemandeRoute