import React from "react";
import { deleteCurrentUser } from "../util/APIUtils";
import { useNavigate } from "react-router";
import { initialUser } from "../constant";
import { isAvailableUsername } from "../util/APIUtils";
import { Modal, message } from "antd";

const DeleteFromProfil = ({
  open,
  closeModal,
  setIsAuthenticated,
  setCurrentUser,
  setIsLoading,
  notify,
}) => {
  const navigate = useNavigate();
  //  const initUser = initialUser;
  const username = JSON.parse(localStorage.getItem("CURRENT_USER")).username;

  async function deleteFromProfil() {
    try {
      setIsLoading(true);
      await deleteCurrentUser();
      localStorage.setItem("token", "");
      localStorage.setItem("CURRENT_USER", JSON.stringify(initialUser));
      localStorage.setItem("IS_AUTHENTICATED", JSON.stringify(false));
      setCurrentUser(initialUser);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
    const isStillAvailable = await isAvailableUsername(username);
    setIsLoading(false);
    if (isStillAvailable.available === true) {
      navigate("/");
      //notify(        "Notification",        "Votre compte a été supprimé avec succès",        "success"      );
      message.success("Votre compte a été supprimé avec succès");
    }
  }
  return (
    <Modal
      title="Suppression de votre compte"
      open={open}
      onOk={deleteFromProfil}
      onCancel={closeModal}
      okText="Supprimer"
      cancelText="Annuler"
    >
      <p>Voulez-vous vraiment supprimer votre compte ?</p>
    </Modal>
  );
};

export default DeleteFromProfil;
