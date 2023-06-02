import React from 'react'
import { Route, Routes } from 'react-router'
import TbordLayout from './TbordLayout'
import MesDemandes from '../demande/MesDemandes'
import MonCompte from '../compte/MonCompte'
import Informations from '../compte/Informations'
import Demandes from '../demande/Demandes'
import Propositions from '../demande/Propositions'
import ChatRoom from '../annonce/ChatRoom'
import Message from '../message/MessageRoute'

const Tbord = ({logout, currentUser}) => {
  return (
    <Routes>
        <Route path='/*' element={<TbordLayout logout={logout} currentUser={currentUser} /> } >
            <Route index element={<MesDemandes currentUser={currentUser} /> } />
            <Route path="moncompte" element={<MonCompte/> } />
            <Route path="moncompte/informations" element={<Informations/> } />
            <Route path="demandes" element={<Demandes/> } />
            <Route path="propositions" element={<Propositions/> } />
            <Route path='chat/*' element={<Message currentUser={currentUser} /> } />
        </Route>
    </Routes>
  )
}

export default Tbord