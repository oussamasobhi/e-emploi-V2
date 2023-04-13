import { Typography, Button, Modal } from "antd";
import React, { useState } from "react";
import { deleteSkill } from "../../util/APIUtils";
import EditCompetence from "./EditCompetence";

const CompetenceItem = ({ competence, refresh, notify, isCurrentUser }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const updateCompetence = () => {
    setIsOpenEdit(true);
  };
  const removeCompetence = () => {
    setIsOpenDelete(true);
  };
  const supprimerCompetence = async () => {
    try {
      await deleteSkill(competence.id);
      refresh();
      setIsOpenDelete(false);
      notify("Notification", "Compétence supprimée avec succès");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Typography.Title level={4} className="uppercase">
          {competence.titre}
        </Typography.Title>
        <div className="flex ">
          <div className="flex-auto">
            <p>Obtenu en {competence.date_obtention}</p>
            <p>{competence.duree_exp} ans d'expérience</p>
            <p>Durée de formation : {competence.duree_formation} </p>
            <p>Niveau scolaire : {competence.niveauscolaire} </p>
          </div>
          {isCurrentUser && (
            <>
              <Button onClick={(e) => updateCompetence(e, competence)}>
                Modifier
              </Button>
              <Button
                onClick={(e) => removeCompetence(e, competence)}
                danger
                className="ml-10"
              >
                Supprimer
              </Button>
            </>
          )}
        </div>
      </div>
      <Modal
        title="Suppression de compétence"
        open={isOpenDelete}
        onOk={supprimerCompetence}
        onCancel={() => setIsOpenDelete(false)}
        okText="Supprimer"
        cancelText="Annuler"
      >
        <p>
          Voulez-vous supprimer la compétence
          <span className="text-semibold uppercase"> {competence.titre}</span> ?
        </p>
      </Modal>
      <EditCompetence
        competence={competence}
        open={isOpenEdit}
        refresh={refresh}
        closeModal={() => setIsOpenEdit(false)}
        notify={notify}
      />
    </>
  );
};

export default CompetenceItem;
