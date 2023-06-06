import Hero from "./Home/Hero";
import Categories from "./Home/Categories";
import Service1 from "./Home/Service1";
import Service2 from "./Home/Service2";
import WhyUs from "./Home/WhyUs";
import { useEffect, useState } from "react";
import { getCategories } from "../util/APIUtils";
import Demandes from "../demande/Demandes";

const Home = ({currentUser}) => {
  const [categorie, setCategorie] = useState(null);
  const [sousCategorie, setSousCategorie] = useState(null);
  useEffect(() => {
    const loadCategorie = async () => {
        try{
            const res = await getCategories();
            setCategorie(res);
        }catch(error){
            console.log(error)
        }
    }
    loadCategorie();    
  }, [])
  return (
    <div className="h-auto overflow-y-auto">  
    {JSON.parse(localStorage.getItem("CURRENT_USER")).role === "ROLE_Pro" && <Demandes/>}
   {JSON.parse(localStorage.getItem("CURRENT_USER")).role === "ROLE_STANDARD" && <>   
     <Categories categories={categorie} />
     </>}
     {JSON.parse(localStorage.getItem("CURRENT_USER")).role === "ROLE_ADMIN" 
     &&
     (<> 
     <Categories categories={categorie} />
     <Demandes/>
     </>
     )}
     {JSON.parse(localStorage.getItem("CURRENT_USER")).username === "" && (
      <>
        <Hero/>
        <WhyUs/>
        <Service1/>
        <Service2/>
      </>
     )}
   
    </div>

  );
};

export default Home;