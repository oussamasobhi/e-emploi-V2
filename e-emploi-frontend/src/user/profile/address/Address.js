import React, { useState } from "react";
import DeleteAddress from "./DeleteAddress";
import EditAddress from "./EditAddress";

const Address = ({ address, notify, setCurrentUser }) => {
  const [isOpenDeleteAddress, setIsOpenDeleteAddress] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isOpenEditAddress, setIsOpenEditAddress] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(false);

  const openDeleteAddress = () => {
    setIsOpenDeleteAddress(true);
  };
  const closeDeleteAddress = () => {
    setIsOpenDeleteAddress(false);
  };
  const removeAddress = (e, address) => {
    e.preventDefault();
    setAddressToDelete(address);
    openDeleteAddress();
  };
  const openEditAddress = () => {
    setIsOpenEditAddress(true);
  }
  const closeEditAddress = () => {
    setIsOpenEditAddress(false);
  }
  const updateAddress = (e, address) => {
    e.preventDefault();
    setAddressToEdit(address);
    openEditAddress();
  }

  return (
    <>
      <table>
        <tbody>
          <tr className="h-12">
            <td>Pays : </td>
            <td className="pl-20">{address.pays}</td>
          </tr>
          <tr className="h-12">
            <td>Ville : </td>
            <td className="pl-20">{address.ville}</td>
          </tr>
          <tr className="h-12">
            <td>Rue : </td>
            <td className="pl-20">{address.libelle_adr}</td>
          </tr>
          <tr className="h-12">
            <td>
              <button className="border text-white bg-blue-600 px-2"
              onClick={(e) => updateAddress(e, address)}>
                Modifier
              </button>
            </td>
            <td className="pl-20">
              <button
                className="border text-white bg-blue-600 px-2"
                onClick={(e) => removeAddress(e, address)}
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <DeleteAddress
        open={isOpenDeleteAddress}
        closeModal={closeDeleteAddress}
        address={address}
        notify={notify}
        setCurrentUser={setCurrentUser}
      />
      <EditAddress
      open={isOpenEditAddress}
      closeModal={closeEditAddress}
      address={address}
      notify={notify}
      setCurrentUser={setCurrentUser}
      />
    </>
  );
};

export default Address;
