import React from 'react'
import { Route, Routes } from 'react-router'
import TbordLayout from './TbordLayout'
import MesDemandes from '../demande/MesDemandes'
import MonCompte from '../compte/MonCompte'
import Informations from '../compte/Informations'
import Propositions from '../demande/Propositions'
import Message from '../message/MessageRoute'
import DashBoard2 from '../admin/DashBoard2'
import Competences from '../compte/Competences'

const Tbord = ({logout, currentUser}) => {
  return (
    <Routes>
        <Route path='/*' element={<TbordLayout logout={logout} currentUser={currentUser} /> } >
            <Route index element={<MesDemandes currentUser={currentUser} /> } />
            <Route path="moncompte" element={<MonCompte/> } />
            <Route path="moncompte/informations" element={<Informations/> } />
            <Route path='moncompte/competences' element={<Competences/> } />
            <Route path="propositions" element={<Propositions/> } />
            <Route path='chat/*' element={<Message currentUser={currentUser} /> } />
            <Route path='admin' element={<DashBoard2/> } />
        </Route>
    </Routes>
  )
}

export default Tbord