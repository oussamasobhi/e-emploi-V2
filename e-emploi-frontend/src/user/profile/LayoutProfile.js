import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { getCurrentUser } from "../../util/APIUtils";
import { Popover } from "@headlessui/react";
import UpdateProfilePict from "./UpdateProfilePict";
import { Avatar, Menu, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LayoutProfile = ({
  setIsAuthenticated,
  currentUser,
  setCurrentUser,
  setIsLoading,
  notify,
}) => {
  const [profilePict, setProfilePict] = useState(null);
  const [isOpenProfilePict, setIsOpenProfilePict] = useState(false);

  useEffect(() => {
    const refreshUser = async () => {
      const res = await getCurrentUser();
      setCurrentUser(res);
    };
    refreshUser();
  }, [setCurrentUser]);

  function closeProfilePictPanel() {
    setIsOpenProfilePict(false);
  }
  function openProfilePictPanel() {
    setIsOpenProfilePict(true);
  }

  const sideMenuItems = [
    {
      label: <a href="/profile">Mon Compte</a>,
      key: "mon_compte",
    },
    {
      label: <a href="/profile/address">Mes adresses</a>,
      key: "mes_addresses",
    },
    {
      label: <a href="/profile/company">Ma société</a>,
      key: "ma_societe",
    },
    {
      label: <a href="/profile/skills">Mes compétences</a>,
      key: "mes_competences",
    },
  ];

  if (currentUser.role === "ROLE_ADMIN") {
    sideMenuItems.push({
      label: <a href="/dashboard">Dashboard</a>,
      key: "dashboard",
    });
  }

  return localStorage.getItem("token") ? (
    <>
      <div className="flex min-h-screen font-roboto">
        <div className="w-1/3 flex flex-col p-4">
          <div className="flex flex-col items-center">
            <div className="bg-white w-56 border rounded-md py-4 flex flex-col items-center">
              <div className="pb-6 w-3/4 text-center flex justify-center items-center">
                <Popover className="relative">
                  <Popover.Button className="focus:outline-none border-none">
                    <Avatar size={128} icon={<UserOutlined />} />
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
              <Typography>
                {currentUser.prenom + " " + currentUser.nom}
              </Typography>
              <p className="text-neutral-500">{/*TO DO*/}</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <Menu items={sideMenuItems} className="w-56" />
          </div>
        </div>
        <div className="w-2/3 py-4 overflow-y-auto">
          <div className="container ">
            <div className="border bg-white rounded-md px-3 w-10/12">
              <div className="pb-6">
                <div className="flex justify-between  w-full">
                  <Typography.Title level={4}>
                    {currentUser.prenom} {currentUser.nom}
                  </Typography.Title>
                </div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdateProfilePict
        open={isOpenProfilePict}
        closeModal={closeProfilePictPanel}
      />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default LayoutProfile;
