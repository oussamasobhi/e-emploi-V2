import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router";
import LayoutOtherProfile from "./LayoutOtherProfile";
import InfoAndContact from "./InfoAndContact/InfoAndContact";
import { userGetUserByUsername } from "../util/APIUtils";
import EditProfile from "./EditProfile";
import Competences from "./competences/Competences";
import Societe from "./societe/Societe";
import Adresse from "./adresses/Adresse";
import { useNavigate } from "react-router";

const OtherProfile = ({
  setIsAuthenticated,
  currentUser,
  setCurrentUser,
  setIsLoading,
  notify,
}) => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const _user = await userGetUserByUsername(username);
        setUser(_user);
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    };
    loadUser();
  }, [username]);
  
  if (!user) return <p>Loading...</p>;
  else
    return localStorage.getItem("token") ? (
      <>
        <Routes>
          <Route
            path="/*"
            element={
              <LayoutOtherProfile currentUser={currentUser} user={user} />
            }
          >
            <Route
              index
              element={<InfoAndContact user={user} currentUser={currentUser} />}
            />
            <Route
              path="edit"
              element={
                <EditProfile
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setIsAuthenticated={setIsAuthenticated}
                  setIsLoading={setIsLoading}
                  notify={notify}
                />
              }
            />
            <Route
              path="address"
              element={
                <Adresse
                  user={user}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  notify={notify}
                />
              }
            />
            <Route
              path="skills"
              element={
                <Competences notify={notify} currentUser={currentUser} user={user} />
              }
            />
            <Route
              path="company"
              element={
                <Societe
                  user={user}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  notify={notify}
                />
              }
            />
          </Route>
        </Routes>
      </>
    ) : (
      <Navigate to="/" />
    );
};

export default OtherProfile;
