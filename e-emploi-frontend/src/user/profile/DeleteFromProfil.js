import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { deleteCurrentUser } from "../../util/APIUtils";
import { useNavigate } from "react-router";
import { initialUser } from "../../constant";
import { isAvailableUsername } from "../../util/APIUtils";

const DeleteFromProfil = ({
  open,
  closeModal,
  setIsAuthenticated,
  setCurrentUser,
  setIsLoading,
  notify
}) => {
  const navigate = useNavigate();
//  const initUser = initialUser;
  const username = JSON.parse(localStorage.getItem("CURRENT_USER")).username;

  async function deleteFromProfil() {
    try {
      setIsLoading(true);
      await deleteCurrentUser();
      localStorage.setItem("token", "");
      localStorage.setItem("CURRENT_USER", JSON.stringify(initialUser));
      localStorage.setItem("IS_AUTHENTICATED", JSON.stringify(false));
      setCurrentUser(initialUser);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
    const isStillAvailable = await isAvailableUsername(username);
    setIsLoading(false);
    if(isStillAvailable.available === true) {
      navigate("/")
      notify(
        "Notification",
        "Votre compte a été supprimé avec succès",
        "success"
      );
    };
  }
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-8" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left mt-32 align-middle border transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Suppression d'utilisateur
                </Dialog.Title>
                <div className="mt-3">
                  <p className="text-lg">Voulez-vous vraiment supprimer votre compte?</p>
                </div>

                <div className="mt-4 w-full flex justify-start">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={deleteFromProfil}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    className="inline-flex mx-16 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Annuler
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteFromProfil;
