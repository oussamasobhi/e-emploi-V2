import { TextField } from "@mui/material";
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
    if((JSON.parse(localStorage.getItem("CURRENT_USER"))).role==="ROLE_ADMIN"){
      navigate("/dboard/admin");
    }else{
    navigate("/");
  }
  };

  return (
    <div className="flex min-h-[550px] flex-col w-auto items-center bg-gray-100 font-roboto">
      <div className="border w-96 ">
        <h1 className="text-3xl font-poppins text-my-blue text-center">
          Connexion
        </h1>
        <div className="flex flex-col p-6 border rounded-md shadow-md bg-white lg:1/3">
          <form className="flex flex-col mb-4 rounded-md bg-white">
           
            <TextField
              variant="standard"
              label="Username or Email"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={loginRequest.usernameOrEmail}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
            type="password"
              variant="standard"
              label="Password"
              id="password"
              name="password"
              value={loginRequest.password}
              onChange={(e) => handleChange(e)}
              
            />
            <div className="py-6">
              <Link
                to="/forgotten"
                className="font-caption font-medium no-underline hover:underline text-blue-600 hover:text-blue-700 text-end"
              >
                Mot de passe oublié
              </Link>
            </div>
            <button
              onClick={(e) => onLogin(e, loginRequest, goToHome)}
              className="text-white text-lg rounded-md font-bold py-2 hover:bg-orange-600 bg-orange-500 border-none transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Se connecter
            </button>
          </form>
          <div className="py-2 text-center font-caption">
            <p>
              Vous n'avez pas de compte?{" "}
              <Link
                to="/signup"
                className="text-blue-600 no-underline hover:text-blue-700 hover:underline"
              >
                S'inscrire
              </Link>
            </p>
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
