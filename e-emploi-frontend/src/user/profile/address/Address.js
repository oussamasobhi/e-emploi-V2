import React, { useState } from "react";
import DeleteAddress from "./DeleteAddress";
import EditAddress from "./EditAddress";
import { Button, Typography } from "antd";

const Address = ({ address, notify, setCurrentUser }) => {
  const [isOpenDeleteAddress, setIsOpenDeleteAddress] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isOpenEditAddress, setIsOpenEditAddress] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);

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
  };
  const closeEditAddress = () => {
    setIsOpenEditAddress(false);
  };
  const updateAddress = (e, address) => {
    e.preventDefault();
    setAddressToEdit(address);
    openEditAddress();
  };

  return (
    <>
      <div className="flex my-10 border-b-2">
        <div className="flex-auto flex flex-col">
          <Typography.Text strong className="text-lg">
            {address.libelle_adr}
            {address.lib_addre}
          </Typography.Text>
          <Typography.Text className="text-sm font-bold">
            {address.ville}, {address.pays}
          </Typography.Text>
        </div>
        <Button onClick={(e) => updateAddress(e, address)}>Modifier</Button>
        <Button onClick={(e) => removeAddress(e, address)} danger className="ml-10">
          Supprimer
        </Button>
      </div>

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
