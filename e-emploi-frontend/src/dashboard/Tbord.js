import React from 'react'
import { Route, Routes } from 'react-router'
import TbordLayout from './TbordLayout'
import MesDemandes from '../demande/MesDemandes'
import MonCompte from '../compte/MonCompte'
import Informations from '../compte/Informations'

const Tbord = ({logout, currentUser}) => {
  return (
    <Routes>
        <Route path='/*' element={<TbordLayout logout={logout} currentUser={currentUser} /> } >
            <Route index element={<MesDemandes currentUser={currentUser} /> } />
            <Route path="moncompte" element={<MonCompte/> } />
            <Route path="moncompte/informations" element={<Informations/> } />
        </Route>
    </Routes>
  )
}

export default Tbord