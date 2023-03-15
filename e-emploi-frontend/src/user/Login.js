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
    <div className="flex flex-col w-auto items-center">
      <div className="bg-inherit w-96">
        <h1 className="text-3xl font-bold pb-6 text-center">Se connecter</h1>
        <div className="flex flex-col p-6 border rounded-md bg-white lg:1/3">
          <form
            onSubmit={(e) => onLogin(e, loginRequest, goToHome)}
            //onSubmit={testNav}
            className="flex flex-col mb-4 rounded-md bg-white"
          >
            <label className="font-bold text-gray-800 mb-2">
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
            <label className="font-bold text-gray-800 mb-2">Mot de passe</label>
            <input
              className="border border-gray-400 px-5 py-3 rounded-md mb-3 outline-none focus:border-blue-600"
              type="password"
              name="password"
              value={loginRequest.password}
              onChange={(e) => handleChange(e)}
            />
            <div className="py-4">
              <Link to="/forgotten">Mot de passe oublié</Link>
            </div>
            <button
              type="submit"
              className="text-white rounded-md font-bold py-3 hover:bg-blue-700 bg-blue-600"
            >
              Se connecter
            </button>
          </form>
          <div className="py-5 text-center">
            <p>Vous n'avez pas de compte? <Link to="/signup" className="text-blue-500 underline underline-offset-2 hover:text-blue-600 hover:font-bold">S'inscrire</Link></p>
          </div>
          <p className=" pb-5 text-center">OR</p>
          <div className="pb-5 text-center">
            Se connecter avec google / facebook ...
          </div>

        </div>
      </div>
    </div>
  );
};


export default Login;
