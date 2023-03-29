import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Notification from "../common/Notification";
import Home from "../common/Home";
import Signup from "../user/Signup";
import Login from "../user/Login";
import Layout from "../common/Layout";
import NotFound from "../common/NotFound";
import ResetPassword from "../user/ResetPassword";
import { getCurrentUser, login, signup } from "../util/APIUtils";
import Profile from "../user/profile/Profile";
import Dashboard from "../admin/Dashboard";
import { initialUser } from "../constant";
import ReactLoading from "react-loading";

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
    notify(
      "Succès",
      "Vous vous êtes bien enregistrés, veuillez vous connecter maintenant !",
      "success"
    );
  };

  const handleLogin = async (e, logReq, func) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const jwToken = await login(logReq);
      localStorage.setItem("token", jwToken.accessToken);
    } catch (error) {
      setIsLoading(false);
      notify("Erreur", "Nom d'utilisateur ou mot de passe incorrects", "error");

      throw new Error();
    }

    //load user
    loadCurrentUser();
    setIsAuthenticated(true);
    func();
    setIsLoading(false);
    notify("Succès", "Vous êtes maintenant connectés", "success");
  };

  const loadCurrentUser = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res);
    localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
  };

  const handleLogout = (e, func) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem("token", "");
    setCurrentUser(initialUser);
    setIsAuthenticated(false);
    setIsLoading(false);
    func();
    notify("Info", "Vous êtes déconnectés !", "info");
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
  if(!currentUser.role){
    currentUser.role = {name:"ROLE_STANDARD"};
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
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Signup onSignup={handleSignup} />
                )
              }
            />
            <Route
              path="login"
              element={
                JSON.parse(localStorage.getItem("IS_AUTHENTICATED")) ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  setIsAuthenticated={setIsAuthenticated}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setIsLoading={setIsLoading}
                  notify={notify}
                />
              }
            />
            
            <Route path="forgotten" element={<ResetPassword />} />
            <Route
              path="dashboard"
              element={
                currentUser.role === "ROLE_ADMIN" ? (
                  <Dashboard notify={notify}/>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
