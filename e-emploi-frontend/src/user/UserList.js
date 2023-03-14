import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getAllUsers } from "../util/APIUtils";
import User from "./User";

const UserList = () => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fillUserList = async () => {
      const res = (await getAllUsers()).content;
      const sortedRes = res.sort((a, b) => a.id - b.id);
      //const sortedRes = (res).sort((a, b) => b.attr.localeCompare(a.attr));
      setUsers(sortedRes);
    };
    fillUserList();
  }, []);

  const deleteUser = () => {};
  const editUser = () => {
    openDetail();
  };
  const closeDetail = () => {
    setIsOpenDetail(false);
  };
  const openDetail = () => {
    setIsOpenDetail(true);
  };

  return (
    <>
      <div className="overflow-x-auto flex justify-center">
        <table className="bg-white rounded-md text-sm font-roboto border-collapse table-auto">
          <thead className="font-bold">
            <tr>
              <th className="text-left font-semibold capitalize tracking-wide p-3 border border-gray-300">
                <input type="checkbox" />
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 border border-gray-300">
                #
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Nom et Prenoms
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Nom d'utilisateur
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Adresse
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Téléphone
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Date de naissance
              </th>
              <th className="text-left font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                CIN
              </th>
              <th className="text-right font-semibold capitalize tracking-wide p-3 truncate border border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          {users && (
            <tbody className="bg-white">
              {users?.map((user, index) => (
                <User
                  user={user}
                  key={user.id}
                  deleteUser={deleteUser}
                  editUser={editUser}
                  even={index % 2 === 0 ? true : false}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>

      <Transition appear show={isOpenDetail} as={Fragment}>
        <Dialog as="div" className="relative z-8" onClose={closeDetail}>
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
                    Details de l'utilisateur
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="tesemibold">
                      Formulaires pour le details de l'utilisateur
                    </p>
                  </div>

                  <div className="mt-4 ">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDetail}
                    >
                      Fermer
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={closeDetail}
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
    </>
  );
};

export default UserList;
