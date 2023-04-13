import React from "react";
import { deleteSociete, getCurrentUser } from "../../util/APIUtils";
import { Modal } from "antd";

const DeleteSociete = ({
  open,
  closeModal,
  societe,
  notify,
  setCurrentUser
}) => {
  const removeSociete = async () => {
    try {
      await deleteSociete(societe.id);
      const _user = await getCurrentUser();
      setCurrentUser(_user);
      closeModal();
      notify("Notification", "Société supprimée avec succès !", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Suppression de votre compte"
      open={open}
      onOk={removeSociete}
      onCancel={closeModal}
      okText="Supprimer"
      cancelText="Annuler"
    >
      <p>
        Voulez-vous vraiment supprimer la société{" "}
        <span className="uppercase">{societe.nom_societe}</span> ?
      </p>
    </Modal>
  );
};

export default DeleteSociete;
