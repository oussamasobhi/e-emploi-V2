import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loginRequest, setLoginRequest] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setLoginRequest({ ...loginRequest, [event.target.name]: value });
  };

  const goToHome = () => {
    navigate("/");
  }

  return (
    <div className="flex flex-col w-auto items-center bg-gray-100 font-roboto">
      <div className="border w-96 ">
        <h1 className="text-4xl  text-center">Se connecter</h1>
        <div className="flex flex-col p-6 border rounded-md shadow-md bg-white lg:1/3">
          <form
            onSubmit={(e) => onLogin(e, loginRequest, goToHome)}
            //onSubmit={testNav}
            className="flex flex-col mb-4 rounded-md bg-white"
          >
            <label className="font-semibold font-caption mb-2">
              Username or Email
            </label>
            <input
              className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
              type="text"
              name="usernameOrEmail"
              placeholder="Username or Email"
              value={loginRequest.usernameOrEmail}
              onChange={(e) => handleChange(e)}
            />
            <label className="font-semibold font-caption mb-2">Mot de passe</label>
            <input
              className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
              type="password"
              name="password"
              value={loginRequest.password}
              onChange={(e) => handleChange(e)}
            />
            <div className="pb-4">
              <Link to="/forgotten" className="font-roboto font-medium no-underline text-blue-500 hover:text-blue-600 text-end">Mot de passe oublié</Link>
            </div>
            <button
              type="submit"
              className="text-white text-lg rounded-md font-bold py-2 hover:bg-orange-600 bg-orange-500 border-none transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Se connecter
            </button>
          </form>
          <div className="py-2 text-center">
            <p>Vous n'avez pas de compte? <Link to="/signup" className="text-blue-500 no-underline hover:text-blue-600 hover:font-bold">S'inscrire</Link></p>
          </div>
          {/*<p className=" pb-5 text-center">OR</p>
          <div className="pb-5 text-center">
            Se connecter avec google / facebook ...
  </div>*/}

        </div>
      </div>
    </div>
  );
};


export default Login;
