import React, { useState } from "react";
import AddressItem from "./AddressItem";
import { Button, Typography } from "antd";
import NewAddress from "./NewAddress";

const Adresse = ({ notify, setCurrentUser, currentUser, user }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const ajouterAddresse = () => {
    setIsOpenAdd(true);
  };

  const isCurrentUser = currentUser.username === user.username;
  if (!user) return <p>Loading...</p>;
  else
    return (
      <>
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <div className="flex justify-between items-center bg-gray-200  px-2 text-gray-800 ">
            <Typography className="font-poppins text-2xl px-2 py-2 text-center">
              Adresses
            </Typography>
            {isCurrentUser && currentUser.adresses.length < 2 && (
              <Button type="primary" onClick={ajouterAddresse}>
                Ajouter
              </Button>
            )}
          </div>
          {isCurrentUser &&
            currentUser.adresses?.map((address, index) => (
              <AddressItem
                address={address}
                key={index}
                notify={notify}
                setCurrentUser={setCurrentUser}
                isCurrentUser={isCurrentUser}
              />
            ))}
          {!isCurrentUser &&
            user.adresses?.map((address, index) => (
              <AddressItem
                address={address}
                key={index}
                notify={notify}
                setCurrentUser={setCurrentUser}
                isCurrentUser={isCurrentUser}
              />
            ))}
        </div>
        {isCurrentUser && (
          <NewAddress
            open={isOpenAdd}
            closeModal={() => setIsOpenAdd(false)}
            notify={notify}
            setCurrentUser={setCurrentUser}
          />
        )}
      </>
    );
};

export default Adresse;
