import Hero from "./Home/Hero";
import Categories from "./Home/Categories";
import Service1 from "./Home/Service1";
import Service2 from "./Home/Service2";
import WhyUs from "./Home/WhyUs";
import { useEffect, useState } from "react";
import { getCategories } from "../util/APIUtils";
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
      <Hero />
      <Categories categories={categorie} />
      <WhyUs />
      <Service1 />
      <Service2 />
    </div>

  );
};

export default Home;