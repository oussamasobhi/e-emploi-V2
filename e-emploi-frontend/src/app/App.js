import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../constant";
import Home from "../common/Home";
import Signup from "../user/Signup";
import Login from "../user/Login";
import Layout from "../common/Layout";
import NotFound from "../common/NotFound";
import ProSignup from "../user/ProSignup";
import ResetPassword from "../user/ResetPassword";

function App() {
  const initUser = {
    id: "",
    username: "",
    name: "",
  };
  const [currentUser, setCurrentUser] = useState(initUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
   

  const handleLogin = async (e, logReq, func) => {
    e.preventDefault();
    const response = await fetch(API_BASE_URL + "/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(logReq),
    });
    if (!response.ok) {
      throw new Error("Nom d'utilisateur ou mot de passe incorrect !");
    }
    //save tokens :
    const jwToken = await response.json();
    const token = jwToken.tokenType + " " + jwToken.accessToken;
    localStorage.setItem('token', jwToken.accessToken);
    //load user
    loadCurrentUser(token);
    setIsAuthenticated(true);
    func();
  };

  const loadCurrentUser = async (token) => {
    //setLoading(true);
    const response = await fetch(API_BASE_URL + "/api/user/me", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": token,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const res = await response.json();

  //  setLoading(false);
    setCurrentUser({
      id: res.id,
      username: res.username,
      name: res.name,
    });
  };

  const handleLogout = (e, func) => {
    e.preventDefault();
    localStorage.setItem('token', null);
    if(localStorage.getItem('token')===null){
      setIsAuthenticated(false);
    }
    func();
  }



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isAuth={isAuthenticated} onLogout={handleLogout} />}>
            <Route index element={<Home isAuth={isAuthenticated} currentUser={currentUser} />} />
            <Route path="pro/signup" element={<ProSignup />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login onLogin={handleLogin} />} />
            <Route path="forgotten" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
