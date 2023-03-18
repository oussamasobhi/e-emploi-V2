import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { Tab } from "@headlessui/react";
import EditProfil from "./EditProfil";
import { getCurrentUser } from "../../util/APIUtils";
import { useNavigate } from "react-router";
import DeleteFromProfil from "./DeleteFromProfil";
import { Popover } from "@headlessui/react";
import Pdp from "../../public/image/logo_itako_bsc.jpg";
import UpdateProfilePict from "./UpdateProfilePict";

const Profile = ({
  setIsAuthenticated,
  currentUser,
  setCurrentUser,
  setIsLoading,
  notify,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  const [profilePict, setProfilePict] = useState(null);
  const [isOpenProfilePict, setIsOpenProfilePict] = useState(false);

  useEffect(() => {
    const refreshUser = async () => {
      const res = await getCurrentUser();
      setCurrentUser(res);
    };
    refreshUser();
  }, [setCurrentUser]);

  const closeModal = () => {
    setOpenEdit(false);
  };
  const openDeleteAlert = () => {
    setOpenDelete(true);
  };
  const closeDeleteAlert = () => {
    setOpenDelete(false);
  };
  const editProfil = () => {
    setOpenEdit(true);
  };
  const deleteProfil = () => {
    openDeleteAlert();
  };
  function goToDashboard() {
    navigate("/dashboard");
  }

  function closeProfilePictPanel() {
    setIsOpenProfilePict(false);
  }
  function openProfilePictPanel() {
    setIsOpenProfilePict(true);
  }

  return localStorage.getItem("token") ? (
    <>
      <div className="flex min-h-screen font-roboto">
        <div className="w-1/3 flex flex-col p-4">
          <div className="flex flex-col items-center">
            <div className="bg-white w-56 border rounded-md py-4 flex flex-col items-center">
              <div className="pb-6 w-3/4 text-center text-gray-400 flex ">
                <Popover className="relative">
                  <Popover.Button className="focus:outline-none">
                    {profilePict ? (
                      <img
                        profilePict={profilePict}
                        alt="profile"
                        className="rounded-full w-full border-gray-400 border-4 p-2"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-full aspect-h-1 "
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </Popover.Button>

                  <Popover.Panel className="absolute z-10 shadow-gray-400 bg-white shadow-sm rounded-sm ">
                    <div className="flex flex-col text-black">
                      {profilePict && (
                        <button className="truncate hover:bg-gray-100 px-3 py-2 text-sm text-left">
                          Voir la photo de profil
                        </button>
                      )}
                      <button
                        className="truncate hover:bg-gray-100 px-3 py-2 text-sm text-left"
                        onClick={openProfilePictPanel}
                      >
                        Modifier la photo de profil
                      </button>
                      {profilePict && (
                        <button className="truncate hover:bg-gray-100 px-3 py-2 text-sm text-left">
                          Supprimer la photo de profil
                        </button>
                      )}
                    </div>

                    <img profilePict="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>
              <p className="mb-2 text-xl font-medium leading-tight text-center">
                {currentUser.prenom + " " + currentUser.nom}
              </p>
              <p className="text-neutral-500">{/*TO DO*/}</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <div className="bg-white w-56 border rounded-md py-4 flex flex-col items-center">
              <p>D'aurres informations ici</p>
            </div>
          </div>
        </div>
        <div className="container w-2/3 py-4">
          <div className="border bg-white rounded-md px-3 pt-4 pb-8 w-10/12">
            <div className="pb-12 border-b">
              <div className="flex justify-between  w-full">
                <h1 className="text-3xl pb-6">
                  {currentUser.prenom} {currentUser.nom}
                </h1>
                {currentUser.role.name === "ROLE_ADMIN" && (
                  <button
                    className="mb-4 px-3 bg-blue-700 text-white text-sm rounded-md border-black"
                    onClick={goToDashboard}
                  >
                    Dashboard
                  </button>
                )}

                <button
                  className="mb-4 px-3 bg-blue-700 text-white text-sm rounded-md border-black"
                  onClick={editProfil}
                >
                  Modifier votre profil
                </button>
              </div>

              <div>
                <h2 className="uppercase py-3 text-gray-700 font-poppins">
                  Informations et contact
                </h2>
                <table>
                  <tbody>
                    <tr className="h-12">
                      <td>Nom d'utilisateur: </td>
                      <td className="pl-20">{currentUser.username}</td>
                    </tr>
                    <tr className="h-12">
                      <td>Email : </td>
                      <td className="pl-20 text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
                        {currentUser.email}
                      </td>
                    </tr>
                    <tr className="h-12">
                      <td>Telephone : </td>
                      <td className="pl-20">{currentUser.num_tel}</td>
                    </tr>
                    <tr className="h-12">
                      <td>CIN : </td>
                      <td className="pl-20">{currentUser.cin}</td>
                    </tr>
                    {/*<tr>
                    <td>Adresse : </td>
                    <td>{currentUser.adresse}</td>
                  </tr>*/}
                  </tbody>
                </table>
              </div>
              {!(currentUser.role.name === "ROLE_ADMIN") && (
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={deleteProfil}
                >
                  Supprimer votre compte
                </button>
              )}
            </div>
            <div className="w-full">
              <Tab.Group>
                <Tab.List className="flex justify-center bg-gray-300 text-gray-600 text-xl font-semibold">
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "h-full p-2 focus:outline-none bg-white"
                        : "h-full p-2 focus:outline-none"
                    }
                  >
                    Services
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "h-full p-2 focus:outline-none bg-white"
                        : "h-full p-2 focus:outline-none "
                    }
                  >
                    Offres d'emploi
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>Les services que vous proposez ici</Tab.Panel>
                  <Tab.Panel>Vos offres d'emplois ici</Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
      <EditProfil
        setCurrentUser={setCurrentUser}
        closeModal={closeModal}
        open={openEdit}
        username={currentUser.username}
      />
      <DeleteFromProfil
        open={openDelete}
        closeModal={closeDeleteAlert}
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
        notify={notify}
      />
      <UpdateProfilePict
        open={isOpenProfilePict}
        closeModal={closeProfilePictPanel}
      />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default Profile;