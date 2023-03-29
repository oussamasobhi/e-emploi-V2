import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { editAddress, getCurrentUser } from "../../../util/APIUtils";

const EditAddress = ({ open, closeModal, notify, setCurrentUser, address }) => {
  const [newAddress, setNewAddress] = useState(address);
  const handleChange = (event) => {
    const value = event.target.value;
    setNewAddress({ ...newAddress, [event.target.name]: value });
  };
  const reset = (e) => {
    e.preventDefault();
    setNewAddress(address);
    closeModal();
  };

  const modifierAddresse = async () => {
    try {
        console.log(newAddress);
      await editAddress(newAddress, address.id);
      const res = await getCurrentUser();
      setCurrentUser(res);
      closeModal();
      notify("Notification", "Addresse ajouté avec succès !", "success");
      console.log(newAddress);
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left mt-14 align-middle border transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Modification d'un adresse
                </Dialog.Title>
                <div className="mt-2">
                  <label className="block text-gray-600 text-sm font-normal">
                    Rue :
                  </label>
                  <input
                    type="text"
                    name="lib_addre"
                    value={newAddress.lib_addre}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />

                  <label className="block text-gray-600 text-sm font-normal">
                    Ville :
                  </label>
                  <input
                    type="text"
                    name="ville"
                    value={newAddress.ville}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                  <label className="block text-gray-600 text-sm font-normal">
                    Pays :
                  </label>
                  <input
                    type="text"
                    name="pays"
                    value={newAddress.pays}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                </div>
                <div className="mt-4 flex justify-evenly">
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
                    onClick={modifierAddresse}
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

export default EditAddress;
