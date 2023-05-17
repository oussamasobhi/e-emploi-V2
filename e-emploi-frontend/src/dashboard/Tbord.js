import React from 'react'
import { Route, Routes } from 'react-router'
import TbordLayout from './TbordLayout'
import MesDemandes from '../mesDemandes/MesDemandes'

const Tbord = ({logout, currentUser}) => {
  return (
    <Routes>
        <Route path='/*' element={<TbordLayout logout={logout} currentUser={currentUser} /> } >
            <Route index element={<MesDemandes currentUser={currentUser} /> } />
        </Route>
    </Routes>
  )
}

export default Tbord