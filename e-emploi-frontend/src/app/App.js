import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Notification from "../common/Notification";
import Home from "../common/Home";
import Signup from "../user/Signup";
import Login from "../user/Login";
import Layout from "../common/Layout";
import NotFound from "../common/NotFound";
import ResetPassword from "../user/ResetPassword";
import { getCurrentUser, login, logout, signup } from "../util/APIUtils";
import Dashboard from "../admin/Dashboard";
import { initialUser } from "../constant";
import ReactLoading from "react-loading";
import Domicile from "../domicile/Domicile";
import EmploiService from "../emploi_servce/EmploiService";
import Annonces from "../annonce/Annonces";
import OtherProfile from "../otherProfile/OtherProfile";
import { message } from "antd";
import Produit from "../produit/Produit";
import { ThemeProvider } from "@mui/material";
import { myTheme } from "../theme";
import ProRegister from "../user/ProRegister";
import CategorieRoute from "../categorie/CategorieRoute";
import FindPro from "../poster/FindPro";
import Tbord from "../dashboard/Tbord";
import DemandeRoute from "../demande/DemandeRoute";


function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("CURRENT_USER"));
    return storedUser !== initialUser
      ? JSON.parse(localStorage.getItem("CURRENT_USER"))
      : initialUser;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if ("CURRENT_USER" in localStorage) {
  } else {
    localStorage.setItem("CURRENT_USER", JSON.stringify(initialUser));
  }
  if ("IS_AUTHENTICATED" in localStorage) {
  } else {
    localStorage.setItem("IS_AUTHENTICATED", JSON.stringify(false));
  }
  if ("token" in localStorage) {
  } else {
    localStorage.setItem("token", "");
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("IS_AUTHENTICATED", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
  }, [currentUser]);

  const handleSignup = async (e, user, func) => {
    e.preventDefault();
    signup(user);
    func();
    message.success({
      content: "Vous êtes inscrits dans e-emploi, veuillez vous connecter maintenant ",
      className: "relative top-16"
    })
  };

  const handleLogin = async (e, logReq, func) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const jwToken = await login(logReq);
      localStorage.setItem("token", jwToken.accessToken);
    } catch (error) {
      setIsLoading(false);
      //notify("Erreur", "Nom d'utilisateur ou mot de passe incorrects", "error");
      //message.error("Nom d'utilisateur ou mot de passe incorrect !");
      message.error({
        content: "Nom d'utilisateur ou mot de passe incorrect ",
        className: "relative top-16",
        duration: 3
      })

      throw new Error();
    }

    //load user
    loadCurrentUser();
    setIsAuthenticated(true);
    func();
    setIsLoading(false);
    //notify("Succès", "Vous êtes maintenant connectés", "success");
    //message.info("Bonjour ! Bienvenue dans e-emploi !")
    message.info({
      content: "Bonjour, bienvenue dans e-emploi",
      className: "relative top-16",
      duration: 3
    })
  };

  const loadCurrentUser = async () => {
    try{
      const res = await getCurrentUser();
      setCurrentUser(res);
      localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
    }catch(error){
      console.log(error)
    }  

  };

  const handleLogout = (e, func) => {
    e.preventDefault();
    setIsLoading(true);
    logout();
    localStorage.setItem("token", "");
    setCurrentUser(initialUser);
    setIsAuthenticated(false);
    setIsLoading(false);
    func();
    //notify("Info", "Vous êtes déconnectés !", "info");
    //message.info("Vous êtes déconnectés !")
    message.info({
      content: "Vous êtes déconnectés",
      className: "relative top-16",
      duration: 3
    })
  };
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: "",
  });
  const notify = (title, message, type) => {
    setShowNotification(true);
    setNotification({
      title: title,
      message: message,
      type: type,
    });
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <ThemeProvider theme={myTheme} >
      <Notification
        title={notification.title}
        message={notification.message}
        type={notification.type}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <div
        className={
          isLoading
            ? "flex items-center w-screen justify-center fixed z-20 top-20"
            : "hidden items-center w-screen justify-center fixed z-20 top-20"
        }
      >
        <ReactLoading
          type={"spokes"}
          color={"#123456"}
          height={30}
          width={30}
        />
      </div>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                setIsLoading={setIsLoading}
                isAuth={isAuthenticated}
                currentUser={isAuthenticated ? currentUser : initialUser}
                onLogout={handleLogout}
              />
            }
          >
            <Route
              index
              element={
                <Home isAuth={isAuthenticated} currentUser={currentUser} />
              }
            />
            <Route
              path="signup"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/" />
                ) : (
                  <Signup onSignup={handleSignup} />
                )
              }
            />
            <Route
              path="prosignup"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/" />
                ) : (
                  <ProRegister />
                )
              }
            />
            <Route
              path="login"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            
            <Route path="forgotten" element={<ResetPassword />} />
            <Route
              path="dashboard"
              element={
                currentUser.role === "ROLE_ADMIN" ? (
                  <Dashboard notify={notify} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="domicile/*" element={<Domicile currentUser={currentUser} />} />
            <Route path="emp_serv/*" element={<EmploiService currentUser={currentUser} />} />
            <Route path="produit" element={<Produit currentUser={currentUser} />} />
            <Route path="annonce/*" element={<Annonces notify={notify} currentUser={currentUser} />} />
            <Route path="categorie/:id" element={<CategorieRoute/> } />
            <Route path="postjob/:id_souscat/*" element={<FindPro/> } />
            <Route path="dboard/*" element={<Tbord logout={handleLogout} currentUser={currentUser} /> } />
            <Route path="demande/:id/*" element={<DemandeRoute/> }/>
            <Route path="*" element={<NotFound />} />
            
            <Route
              path="/:username/*"
              element={
                <OtherProfile
                  setIsAuthenticated={setIsAuthenticated}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setIsLoading={setIsLoading}
                  notify={notify}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
