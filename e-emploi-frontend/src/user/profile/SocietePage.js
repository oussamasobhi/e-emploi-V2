import React, { useState } from "react";
import Societe from "./societe/Societe";
import AddSociete from "./societe/AddSociete";
import { Typography, Button } from "antd";

const Societepage = ({ societe, currentUser, notify, setCurrentUser }) => {
  const [isOpenAddSociete, setIsOpenAddSociete] = useState(false);
  function openAddSociete() {
    setIsOpenAddSociete(true);
  }
  function closeAddSociete() {
    setIsOpenAddSociete(false);
  }
  const ajouterSociete = () => {
    openAddSociete();
  };
  return (
    <>
      <div className="border-b">
        <div className="flex justify-between items-center">
          <Typography.Title level={3} className="uppercase text-center">
            Société
          </Typography.Title>
          {!currentUser.societe && (
            <Button type="primary" onClick={ajouterSociete}>
              Ajouter
            </Button>
          )}
        </div>

        {currentUser.societe && (
          <Societe
            societe={currentUser.societe}
            setCurrentUser={setCurrentUser}
            notify={notify}
          />
        )}
      </div>
      <AddSociete
        open={isOpenAddSociete}
        closeModal={closeAddSociete}
        notify={notify}
        setCurrentUser={setCurrentUser}
      />
    </>
  );
};

export default Societepage;
