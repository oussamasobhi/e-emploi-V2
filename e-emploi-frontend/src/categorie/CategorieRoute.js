import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getCategories, getSousCategories, getSousCategories2 } from "../util/APIUtils";
import { Box, Typography } from "@mui/material";

const CategorieRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState(null);
  const [sousCategorie, setSousCategorie] = useState(null);
  const [sousCategorie2, setSousCategorie2] = useState(null);
  
  const prevUrl = window.location.pathname;
  useEffect(() => {
    const loadCategorie = async () => {
      try {
        const res = await getCategories();
        const cat = res.find((item) => item.id == id);
        setCategorie(cat);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategorie();
  }, [id]);
  useEffect(() => {
    console.log(categorie);
    const loadSousCategorie = async () => {
      try {
        const res = await getSousCategories(categorie.id);
        setSousCategorie(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categorie) loadSousCategorie();
  }, [categorie]);
  useEffect(() => {
    console.log(sousCategorie);
  }, [sousCategorie]);

  const sousCatFunction = async (id1) => {
    try{
        localStorage.setItem("prevUrl",JSON.stringify(prevUrl))
        localStorage.setItem("cat1",JSON.stringify(id));
        navigate("/postjob/"+id1+"/duree")
        const res = await getSousCategories2(id1);
        setSousCategorie2(res);
    }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    
    console.log(sousCategorie2);
  }, [sousCategorie2])
  

  return !categorie ? (
    <Typography>Loading...</Typography>
  ) : (
    <div className="pt-16 px-10 lg:px-20">
      <Typography
        variant="h5"
        fontFamily="Poppins"
        fontWeight="bold"
        color="black"
      >
        Tous nos services pour <span className="lowercase">{categorie.nom_categorie}</span>
      </Typography>
      <Box className="py-5 grid md:grid-cols-4 gap-6">
        {sousCategorie?.map((item,index)=>(
          <Box key={item.id} sx={{height:"200px"}} className="cursor-pointer" onClick={()=>sousCatFunction(item.id)} >
          <Box sx={{height:"140px"}} className="bg-blue-400 rounded-xl overflow-hidden" key={index}>
           
          </Box>
          <Typography variant="body1" fontFamily="Poppins" fontWeight="bold" className='hover:text-gray-800 mt-2' >{item.nom_sous_categorie}</Typography>
          
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default CategorieRoute;
