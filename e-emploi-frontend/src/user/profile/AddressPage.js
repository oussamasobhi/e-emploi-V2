import React, { useState } from "react";
import Address from "./address/Address";
import AddAddress from "./address/AddAddress";
import { Button, Typography } from "antd";

const AddressPage = ({ notify, setCurrentUser, currentUser }) => {
  const [isOpenAddAddress, setIsOpenAddAddress] = useState(false);
  function openAddAddress() {
    setIsOpenAddAddress(true);
  }
  function closeAddAddress() {
    setIsOpenAddAddress(false);
  }
  const ajouterAddresse = () => {
    openAddAddress();
  };

  return (
    <>
      <div className="border-b">
        <div className="flex justify-between items-center">
          <Typography.Title level={3} className="uppercase text-center">
            Adresses
          </Typography.Title>
          {currentUser.adresses.length < 2 && (
            <Button type="primary" onClick={ajouterAddresse}>
              Ajouter
            </Button>
          )}
        </div>

        {currentUser.adresses?.map((address, index) => (
          <Address
            address={address}
            key={index}
            notify={notify}
            setCurrentUser={setCurrentUser}
          />
        ))}
      </div>
      <AddAddress
        open={isOpenAddAddress}
        closeModal={closeAddAddress}
        notify={notify}
        setCurrentUser={setCurrentUser}
      />
    </>
  );
};

export default AddressPage;
