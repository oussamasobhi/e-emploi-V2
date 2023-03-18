import React, { useState } from "react";
import UserList from "./UserList";
import { Listbox } from "@headlessui/react";

const Users = () => {
  const pages = [10, 30, 50, 100];
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  /*const [responseUser, setResponseUser] = useState({
    nom:"",
    prenom:"",
    username:"",
    email:""
  })*/
  return (
    <div>
      <h1 className="text-center py-3 text-3xl">Gestion des utilisateurs</h1>
      <div className="flex justify-between">
        <div>
          Afficher
          <span>
            <Listbox value={selectedPage} onChange={setSelectedPage}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  {selectedPage}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {pages.map((page) => (
                    <Listbox.Option
                      key={page}
                      value={page}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {page}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </span>
        </div>
      </div>
      <UserList className="relative z-1" />
    </div>
  );
};

export default Users;
