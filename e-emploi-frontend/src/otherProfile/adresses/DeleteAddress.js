import React from 'react';
import { deleteAddress, getCurrentUser } from '../../util/APIUtils';
import { Modal } from 'antd';

const DeleteAddress = ({
  open,
  closeModal,
  address,
  notify,
  setCurrentUser,
}) => {
  const removeAddress =async () => {
    try {
      await deleteAddress(address.id);
      const res = await getCurrentUser();
      setCurrentUser(res);
      closeModal();
      notify("Notification", "Addresse supprimé avec succès !", "success");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal
      title="Suppression d'adresse"
      open={open}
      onOk={removeAddress}
      onCancel={closeModal}
      okText="Supprimer"
      cancelText="Annuler"
    >
      <p>Voulez-vous vraiment supprimer cette adresse ?</p>
    </Modal>
  )
}

export default DeleteAddress