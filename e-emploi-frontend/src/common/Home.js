import { Navigate } from "react-router";
import Hero from "./Home/Hero";
import PhoneNumber from "./Home/PhoneNumber";
import Service1 from "./Home/Service1";
import Service2 from "./Home/Service2";
import WhyUs from "./Home/WhyUs";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../util/APIUtils";
const Home = () => {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      try{
        const res = await getCurrentUser();
        setCurrent(res);
      }catch(error){
        console.log(error);
      }
    }
    loadUser();
  }, [])
  useEffect(() => {
    console.log(current);
  }, [current])
    
  
  return (
    current?.roleName === "ROLE_ADMIN"?
    <Navigate to="dashboard"/>
    :(
    <div className="h-auto overflow-y-auto">
      <Hero />
      <PhoneNumber />
      <WhyUs />
      <Service1 />
      <Service2 />
    </div>)

  );
};

export default Home;