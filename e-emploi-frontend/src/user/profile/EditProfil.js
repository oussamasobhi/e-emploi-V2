import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getCurrentUser, updateProfil } from "../../util/APIUtils";
import { initialUser } from "../../constant";

const EditProfil = ({ open, username, setCurrentUser, closeModal }) => {
  const [user, setUser] = useState(initialUser);
  const [storedUser, setStoredUser] = useState(initialUser);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res);
        setStoredUser(res);
        setIsOpen(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) {
      fetchData();
    }
  }, [username]);

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res);
        setIsOpen(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) {
      fetchData();
    }
  }, [username]);*/

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    closeModal();
  };

  const editProfil = async (e) => {
    try {
      setUser({...user, password:storedUser.password});
      await updateProfil(user);
      setCurrentUser(user);
      reset(e);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left h-screen mt-32 align-middle border transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Modificaton d'utilisateur
                </Dialog.Title>
                <div className="mt-2">
                  <label className="block text-gray-600 text-sm font-normal">
                    Nom :
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={user.nom}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                  <label className="block text-gray-600 text-sm font-normal">
                    Prenom :
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={user.prenom}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                  <label className="block text-gray-600 text-sm font-normal">
                    Nom d'utilisateur:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                  <label className="block text-gray-600 text-sm font-normal">
                    Email :
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                  {/*<label className="block text-gray-600 text-sm font-normal">
                    Adresse :
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={user.adresse}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2 focus:outline-none"
  />*/}
                  <label className="block text-gray-600 text-sm font-normal">
                    Téléphone :
                  </label>
                  <input
                    type="text"
                    name="num_tel"
                    value={user.num_tel}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                  <label className="block text-gray-600 text-sm font-normal">
                    CIN :
                  </label>
                  <input
                    type="text"
                    name="cin"
                    value={user.cin}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={reset}
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={editProfil}
                  >
                    Enregistrer
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

export default EditProfil;
