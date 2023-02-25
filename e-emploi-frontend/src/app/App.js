import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constant";
import Notification from "../common/Notification";
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
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("CURRENT_USER"));
    return storedUser !== initUser ? JSON.parse(localStorage.getItem("CURRENT_USER")) : initUser;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== '') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("IS_AUTHENTICATED", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
  }, [currentUser])

  const handleSignup = async (e, user, func) => {
    e.preventDefault();
    const response = await fetch(API_BASE_URL + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const res = await response.json();
    console.log(res);
    console.log("Veuillez vous connecter");
    notify("Succès", "Vous vous êtes bien enregistrés, veuillez vous connecter maintenant !", "success");
    func();
  };

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
      notify("Erreur", "Nom d'utilisateur ou mot de passe incorrect !", "error");
      throw new Error("Nom d'utilisateur ou mot de passe incorrect !");
    }
    //save tokens :
    const jwToken = await response.json();
    let token = jwToken.tokenType + " " + jwToken.accessToken;
    localStorage.setItem('token', jwToken.accessToken);
    notify("Succès", "Vous êtes maintenant connectés", "success");
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
    localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
  };

  const handleLogout = (e, func) => {
    e.preventDefault();
    localStorage.setItem('token', '');
    setCurrentUser(initUser);
    setIsAuthenticated(false);
    notify("Info", "Vous êtes déconnectés !", "info")
    func();
  }
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: ""
  })
  const notify = (title, message, type) => {
    setShowNotification(true);
    setNotification({
      title: title,
      message: message,
      type: type
    });
    setTimeout(() => setShowNotification(false), 2000);
  }



  return (
    <>
      <Notification
        title={notification.title}
        message={notification.message}
        type={notification.type}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isAuth={isAuthenticated} onLogout={handleLogout} />}>
            <Route index element={<Home isAuth={isAuthenticated} currentUser={currentUser} />} />
            <Route path="pro/signup" element={isAuthenticated ? <Navigate to='/' /> : <ProSignup />} />
            <Route path="signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />} />
            <Route path="login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="forgotten" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
