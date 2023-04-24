import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router'

const LayoutAnnonceDetail = () => {
    const idAnnonce = (useParams()).id;
    useEffect(() => {
      console.log(idAnnonce);
  },[])
    useEffect(() => {
        console.log(idAnnonce);
    },[idAnnonce])
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default LayoutAnnonceDetail;
