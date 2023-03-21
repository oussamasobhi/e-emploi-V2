import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { deleteUserByUsername } from "../../util/APIUtils";

const DeleteUser = ({ open, closeModal, selectedUser }) => {
  console.log(selectedUser);
  async function deleteUser() {
   try {
        await deleteUserByUsername(selectedUser.username);
    } catch (error) {
      console.log(error);
    }
  }

  const reset = () => {
    closeModal();
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-8" onClose={reset}>
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
                  <p className="text-lg">
                    Voulez-vous vraiment supprimer votre compte?
                  </p>
                </div>

                <div className="mt-4 w-full flex justify-start">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={deleteUser}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    className="inline-flex mx-16 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={reset}
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

export default DeleteUser;
