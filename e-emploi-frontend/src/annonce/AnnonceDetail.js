import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router'

const AnnonceDetail = () => {
    const {id} = useParams();
    const [annonce, setAnnonce] = useState(null);
    useEffect(() => {
      const loadAnnonce = async () => {
        try{

        }catch(error){
            console.log(error);
        }
      }
      loadAnnonce();
    }, [])
    
  return (
    <div>The id of this annonce is {id} </div>
  )
}

export default AnnonceDetail