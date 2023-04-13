import React, { useState } from "react";
import DeleteAddress from "./DeleteAddress";
import EditAddress from "./EditAddress";
import { Button, Typography } from "antd";

const AddressItem = ({ address, notify, setCurrentUser, isCurrentUser }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const removeAddress = (e) => {
    e.preventDefault();
    setIsOpenDelete(true);
  };
  const updateAddress = (e) => {
    e.preventDefault();
    setIsOpenEdit(true);
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
        {isCurrentUser && (
          <>
            {" "}
            <Button onClick={(e) => updateAddress(e)}>Modifier</Button>
            <Button onClick={(e) => removeAddress(e)} danger className="ml-10">
              Supprimer
            </Button>
          </>
        )}
      </div>
      {isCurrentUser && (
        <>
          <DeleteAddress
            open={isOpenDelete}
            closeModal={() => setIsOpenDelete(false)}
            address={address}
            notify={notify}
            setCurrentUser={setCurrentUser}
          />
          <EditAddress
            open={isOpenEdit}
            closeModal={() => setIsOpenEdit(false)}
            address={address}
            notify={notify}
            setCurrentUser={setCurrentUser}
          />
        </>
      )}
    </>
  );
};

export default AddressItem;
