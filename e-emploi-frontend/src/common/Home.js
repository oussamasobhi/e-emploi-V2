import Hero from "./Home/Hero";
import PhoneNumber from "./Home/PhoneNumber";
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
    </div>

  );
  //}
};

export default Home;
