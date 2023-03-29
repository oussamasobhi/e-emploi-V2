import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { updateSociete, getCurrentUser } from "../../util/APIUtils";

const EditSociete = ({ open, closeModal, notify, setCurrentUser, societe }) => {
  const [newSociete, setNewSociete] = useState(societe);
  const handleChange = (event) => {
    const value = event.target.value;
    setNewSociete({ ...societe, [event.target.name]: value });
  };
  const reset = (e) => {
    e.preventDefault();
    setNewSociete(societe);
    closeModal();
  };

  const modifierSociete = async () => {
    try {
      await updateSociete(societe.id, newSociete);
      const _user = await getCurrentUser();
      setCurrentUser(_user);
      closeModal();
      notify("Notification", "Société modifiée avec succès !", "info");
    } catch (error) {}
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
                  Ajout de la société
                </Dialog.Title>
                <div className="mt-2">
                  <label className="block text-gray-600 text-sm font-normal">
                    Nom de la société :
                  </label>
                  <input
                    type="text"
                    name="nom_societe"
                    value={newSociete.nom_societe}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />

                  <label className="block text-gray-600 text-sm font-normal">
                    Téléphone :
                  </label>
                  <input
                    type="text"
                    name="num_tel"
                    value={newSociete.num_tel}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                  <label className="block text-gray-600 text-sm font-normal">
                    Site Web :
                  </label>
                  <input
                    type="text"
                    name="siteweb"
                    value={newSociete.siteweb}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-full border mt-2 px-2 py-2"
                  />
                  <label className="block text-gray-600 text-sm font-normal">
                    Numéro patente:
                  </label>
                  <input
                    type="text"
                    name="num_patente"
                    value={newSociete.num_patente}
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
                    onClick={modifierSociete}
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

export default EditSociete;
