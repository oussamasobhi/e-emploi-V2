import React, { useState } from "react";
import SocieteItem from "./SocieteItem";
import NewSociete from "./NewSociete";
import { Typography, Button } from "antd";

const Societe = ({ user, currentUser, notify, setCurrentUser }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const ajouterSociete = () => {
    setIsOpenAdd(true);
  };
  const isCurrentUser = currentUser.username === user.username;
  return (
    <>
      <div className="border-b overflow-hidden bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center bg-gray-200  px-2 text-gray-800 ">
          <Typography className="font-poppins text-2xl px-2 py-2 text-center">
            Société
          </Typography>
          {isCurrentUser && !currentUser.societe && (
            <Button type="primary" onClick={ajouterSociete}>
              Ajouter
            </Button>
          )}
        </div>
        {isCurrentUser && currentUser.societe && (
          <SocieteItem
            societe={currentUser.societe}
            setCurrentUser={setCurrentUser}
            notify={notify}
            isCurrentUser={isCurrentUser}
          />
        )}
        {!isCurrentUser && user.societe && (
          <SocieteItem
            societe={user.societe}
            setCurrentUser={setCurrentUser}
            notify={notify}
            isCurrentUser={isCurrentUser}
          />
        )}
      </div>
      <NewSociete
        open={isOpenAdd}
        closeModal={() => setIsOpenAdd(false)}
        notify={notify}
        setCurrentUser={setCurrentUser}
      />
    </>
  );
};

export default Societe;
