import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Routes, Route } from 'react-router'
import PosterLayout from './PosterLayout';
import { getAllSousCatagorie } from '../util/APIUtils';
import Duree from './Duree';
import Lieu from "./Lieu";
import Date from "./Date";
import Precision from './Precision';
const FindPro = () => {
    const prevUrl=JSON.parse(localStorage.getItem("prevUrl"));
    const [souscategorie, setSouscategorie] = useState(null);
    const [titre, setTitre] = useState("");
    const {id_souscat} = useParams();
    const [annonce, setAnnonce] = useState({
        date:"",
        duree:"",
        ville:"",
        quartier:"",
        supplement:"",
        //id_categorie2Annonce:"",
        id_categorie1Annonce:id_souscat,
        infos_complementaire:""
      })
    useEffect(() => {
        const loadSouscategorie = async () => {
            try{
                const res = await getAllSousCatagorie();
                const _souscat = res.find(item => item.id == id_souscat);
                setSouscategorie(_souscat);
            }catch(error){
                console.log(error);
            }
        }
        if(id_souscat) loadSouscategorie();
      console.log(id_souscat);
    }, [id_souscat])

    useEffect(() => {
      console.log(souscategorie);
    }, [souscategorie])
    const [lastElt, setLastElt] = useState("");
   
    const path = window.location.pathname;
    
    useEffect(() => {
        const pathElements = path.split("/");
        setLastElt(pathElements[pathElements.length - 1]);
    }, [path])

    useEffect(() => {
        if(lastElt==="duree") setTitre('Combien vous estimez pour la durée de réalisation?')
        else if (lastElt==="lieu") setTitre("Quelle est l'adresse de la prestation?")
        else if (lastElt==="date") setTitre("Quand est la date de réalisation?")
        else if (lastElt==="details") setTitre("Avez-vous des précisions à apporter?");
    }, [lastElt])

    useEffect(() => {
        console.log(titre);
    }, [titre])   
 
    useEffect(() => {
        console.log(annonce)
    },[annonce])
    
  return (
    <div>
        <Routes>
            <Route path='/*' element={<PosterLayout souscategorie={souscategorie} titre={titre} prevUrl={prevUrl} annonce={annonce} /> } >
                <Route path='duree' element={<Duree setAnnonce={setAnnonce} annonce={annonce}/> } />
                <Route path="lieu" element={<Lieu setAnnonce={setAnnonce} annonce={annonce} /> }/>
                <Route path="date" element={<Date setAnnonce={setAnnonce} annonce={annonce} />}  />
                <Route path="details" element={<Precision setAnnonce={setAnnonce} annonce={annonce} /> }  />
            </Route>
        </Routes>
    </div>
  )
}

export default FindPro