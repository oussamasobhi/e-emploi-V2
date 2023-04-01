import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { getCurrentUser } from "../../util/APIUtils";
import { useNavigate } from "react-router";
import LayoutProfile from "./LayoutProfile";
import { Routes, Route } from "react-router";
import AddressPage from "./AddressPage";
import PersonalInfoPage from "./PersonalInfoPage";
import Societepage from "./SocietePage";
import CompetencesPage from "./CompetencesPage";
import UpdateProfil from "./UpdateProfil";

const Profile = ({
  setIsAuthenticated,
  currentUser,
  setCurrentUser,
  setIsLoading,
  notify,
  current,
  setCurrent,
  onClick,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const refreshUser = async () => {
      const res = await getCurrentUser();
      setCurrentUser(res);
    };
    refreshUser();
  }, [setCurrentUser]);

  return localStorage.getItem("token") ? (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <LayoutProfile
              setIsAuthenticated={setIsAuthenticated}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              notify={notify}
            />
          }
        >
          <Route
            index
            element={
              <PersonalInfoPage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                notify={notify}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="edit"
            element={
              <UpdateProfil
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
              <AddressPage
                notify={notify}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="company"
            element={
              <Societepage
                societe={currentUser.societe}
                setCurrentUser={setCurrentUser}
                notify={notify}
                currentUser={currentUser}
              />
            }
          />
          <Route path="skills" element={<CompetencesPage notify={notify} />} />
        </Route>
      </Routes>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default Profile;
