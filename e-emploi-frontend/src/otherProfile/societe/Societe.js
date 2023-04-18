import React, { useState } from "react";
import SocieteItem from "./SocieteItem";
import NewSociete from "./NewSociete";
import { Typography, Button } from "antd";

const Societe = ({user, currentUser, notify, setCurrentUser }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const ajouterSociete = () => {
    setIsOpenAdd(true);
  };
  const isCurrentUser = currentUser.username === user.username;
  return (
    <>
      <div className="border-b">
        <div className="flex justify-between items-center">
          <Typography.Title level={3} className="uppercase text-center">
            Société
          </Typography.Title>
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
