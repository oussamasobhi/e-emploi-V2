import Hero from "./Home/Hero";
import PhoneNumber from "./Home/PhoneNumber";
import Service1 from "./Home/Service1";
import Service2 from "./Home/Service2";
import WhyUs from "./Home/WhyUs";
const Home = ({ isAuth, currentUser }) => {

  /* if (!isAuth) {
     return ("No user is authenticated !");
   }
   else {*/
  return (
    <div className="h-auto">
      <Hero />
      <PhoneNumber />
      <WhyUs />
      <Service1 />
      <Service2 />
    </div>

  );
  //}
};

export default Home;