import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const DetailsUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    function openModal(){
        setIsOpen(true);
    }
    function closeModal(){
      setIsOpen(false);
    }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading leading-6 text-gray-900"
              >
                Details de l'utilisateurs
              </Dialog.Title>
              <div>Here you put the form</div>
              <button>
                Fermer
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailsUser;
