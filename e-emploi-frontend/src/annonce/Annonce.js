import React from 'react'
import { Route, Routes } from 'react-router'
import LayoutAnnonce from './LayoutAnnonce'
import CreateAnnonce from './CreateAnnonce'

const Annonce = ({notify}) => {
  return (
    <Routes>
        <Route path='/*' element={<LayoutAnnonce />} >
            <Route path='create' element={<CreateAnnonce notify={notify} /> } />
        </Route>
    </Routes>
  )
}

export default Annonce