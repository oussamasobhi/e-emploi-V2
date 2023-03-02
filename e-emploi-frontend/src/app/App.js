import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Notification from "../common/Notification";
import Home from "../common/Home";
import Signup from "../user/Signup";
import Login from "../user/Login";
import Layout from "../common/Layout";
import NotFound from "../common/NotFound";
import ProSignup from "../user/ProSignup";
import ResetPassword from "../user/ResetPassword";
import { getCurrentUser, login, proSignup, signup } from "../util/APIUtils";
import Profile from "../user/Profile";

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
    signup(user);
    notify("Succès", "Vous vous êtes bien enregistrés, veuillez vous connecter maintenant !", "success");
    func();
  };

  const handleLogin = async (e, logReq, func) => {
    e.preventDefault();
    /**try {
      const jwToken = await login(logReq);
      localStorage.setItem('token', jwToken.accessToken);
    } catch (error) {
      notify("Erreur", "Nom d'utilisateur ou mot de passe incorrects", "error");
    }*/
    try {
      const jwToken = await login(logReq);
      localStorage.setItem('token', jwToken.accessToken);
    } catch (error) {
      notify("Erreur", "Nom d'utilisateur ou mot de passe incorrects", "error");
      throw new Error();
    }



    notify("Succès", "Vous êtes maintenant connectés", "success");
    //load user
    loadCurrentUser();
    setIsAuthenticated(true);
    func();
  };

  const loadCurrentUser = async () => {
    const res = await getCurrentUser();
    setCurrentUser({
      id: res.id,
      username: res.username,
      name: res.name,
    });
    localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
  };

  const handleProSignup = async (e, user, func) => {
    e.preventDefault();
    proSignup(user);
    notify("Succès", "Vous vous êtes bien enregistrés, veuillez vous connecter maintenant !", "success");
    func();
  }

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
          <Route path="/" element={<Layout isAuth={isAuthenticated} currentUser={isAuthenticated?currentUser:initUser} onLogout={handleLogout} />}>
            <Route index element={<Home isAuth={isAuthenticated} currentUser={currentUser} />} />
            <Route path="pro/signup" element={isAuthenticated ? <Navigate to='/' /> : <ProSignup onProSignup={handleProSignup} />} />
            <Route path="signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />} />
            <Route path="login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/profile" element={isAuthenticated ? <Profile/> : <Navigate to="/" />} />
            <Route path="forgotten" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
