import React, { useState } from "react";
import { Navigate } from "react-router";
import { Tab } from "@headlessui/react";
import EditProfil from "./EditProfil";

const Profile = ({ currentUser }) => {
  const [openEdit, setOpenEdit] = useState(false);

  return localStorage.getItem("token") ? (
    <>
      <div className="flex min-h-screen font-roboto">
        <div className="w-1/3 flex flex-col p-4">
          <div className="flex flex-col items-center">
            <div className="bg-white w-56 border rounded-md py-4 flex flex-col items-center">
              <div className="py-6 h-36 w-36 text-center">
                {/*TO DO*/}
                Photo de profil
              </div>
              <p className="text-md text-centermb-2">
                {currentUser.prenom + " " + currentUser.nom}
              </p>
              <p className="text-xs mt-5">***** autres info</p>
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
              <div className="flex justify-between px-4 w-full">
                <h1 className="text-3xl pb-6">Mon compte</h1>
                <button
                  className="mb-4 px-3 bg-blue-700 text-white text-sm rounded-md border-black"
                  onClick={() => setOpenEdit(true)}
                >
                  Modifier votre profil
                </button>
              </div>

              <p>
                Quelques infos *******
              </p>
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
      <EditProfil open={openEdit} openModal={() => setOpenEdit(true)} closeModal={() => setOpenEdit(false)}/>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default Profile;
