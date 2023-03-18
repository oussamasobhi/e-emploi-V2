import { Navigate } from "react-router";
import Hero from "./Home/Hero";
import PhoneNumber from "./Home/PhoneNumber";
import Service1 from "./Home/Service1";
import Service2 from "./Home/Service2";
import WhyUs from "./Home/WhyUs";
const Home = ({  currentUser }) => {

  
  return (
    currentUser.roleName === "ROLE_ADMIN"?
    <Navigate to="dashboard"/>
    :(
    <div className="h-auto">
      <Hero />
      <PhoneNumber />
      <WhyUs />
      <Service1 />
      <Service2 />
    </div>)

  );
};

export default Home;