import React, { useState } from "react";
import DeleteSociete from "./DeleteSociete";
import EditSociete from "./EditSociete";
import { Button } from "antd";

const Societe = ({ societe, notify, setCurrentUser }) => {
  const [isOpenDeleteSociete, setIsOpenDeleteSociete] = useState(false);
  const [isOpenEditSociete, setIsOpenEditSociete] = useState(false);
  function openDeleteSociete() {
    setIsOpenDeleteSociete(true);
  }
  function closeDeleteSociete() {
    setIsOpenDeleteSociete(false);
  }
  function openEditSociete() {
    setIsOpenEditSociete(true);
  }
  function closeEditSociete() {
    setIsOpenEditSociete(false);
  }
  const updateSociete = (e) => {
    e.preventDefault();
    openEditSociete();
  };

  const removeSociete = (e) => {
    e.preventDefault();
    openDeleteSociete();
  };

  return (
    <>
      <table>
        <tbody>
          <tr className="h-12">
            <td>Nom de la société : </td>
            <td className="pl-20">{societe.nom_societe}</td>
          </tr>
          <tr className="h-12">
            <td>Téléphone : </td>
            <td className="pl-20">{societe.num_tel}</td>
          </tr>
          <tr className="h-12">
            <td>Site Web: </td>
            <td className="pl-20">{societe.siteweb}</td>
          </tr>
          <tr className="h-12">
            <td>Numéro Patente: </td>
            <td className="pl-20">{societe.num_patente}</td>
          </tr>
          <tr className="h-12">
            <td>
              <Button
                onClick={(e) => updateSociete(e, societe)}
              >
                Modifier
              </Button>
            </td>
            <td className="pl-20">
              <Button
                onClick={(e) => removeSociete(e, societe)} danger
              >
                Supprimer
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <DeleteSociete
        open={isOpenDeleteSociete}
        notify={notify}
        setCurrentUser={setCurrentUser}
        closeModal={closeDeleteSociete}
        societe={societe}
      />
      <EditSociete
        open={isOpenEditSociete}
        notify={notify}
        setCurrentUser={setCurrentUser}
        closeModal={closeEditSociete}
        societe={societe}
      />
    </>
  );
};

export default Societe;
