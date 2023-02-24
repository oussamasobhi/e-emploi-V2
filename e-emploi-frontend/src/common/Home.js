const Home = ({ isAuth, currentUser}) => {

  if (!isAuth) {
    return ("No user is authenticated !");
  }
  else {
    return (
      <p>The user <span className="text-bold">{currentUser.name}</span> is authenticated</p>
    );
  }
};

export default Home;
