import React  from "react";
import { Button, Modal, Typography } from "antd";
import dayjs from "dayjs";
import { initialUser } from "../../constant";

const DetailsUser = ({
  selectedUser,
  setSelectedUser,
  refreshList,
  setIsOpen,
  isOpen,
  notify,
}) => {
  const reset = (e) => {
    e.preventDefault();
    setSelectedUser(initialUser);
    refreshList();
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      title="Détails de l'utilisateur"
      footer={[<Button onClick={reset}>Fermer</Button>]}
    >
      <Typography>
        <span className="font-bold">Nom :</span>{" "}
        <span>{selectedUser.nom} </span>
      </Typography>
      <Typography>
        <span className="font-bold">Prénom :</span>{" "}
        <span>{selectedUser.prenom} </span>
      </Typography>
      <Typography>
        <span className="font-bold">Email :</span>{" "}
        <span>{selectedUser.email} </span>
      </Typography>
      <Typography>
        <span className="font-bold">Nom d'utilisateur:</span>{" "}
        <span>{selectedUser.username} </span>
      </Typography>
      <Typography>
        <span className="font-bold">Date de naissance :</span>
        <span>
          {selectedUser.date_naissance
            ? dayjs(selectedUser.date_naissance).format("DD MMMM YYYY")
            : ""}
        </span>
      </Typography>
      <Typography>
        <span className="font-bold">Téléphone :</span>{" "}
        <span>{selectedUser.num_tel} </span>
      </Typography>
      <Typography>
        <span className="font-bold">CIN :</span>{" "}
        <span>{selectedUser.cin} </span>
      </Typography>
      <Typography>
        <span className="font-bold">Adresses :</span>
        {selectedUser.adresses?.map((adr, index) => (
          <>
            <br /> {adr.libelle_adr} ({adr.ville}, {adr.pays})
          </>
        ))}
      </Typography>
      <Typography>
        <span className="font-bold">Société :</span>{" "}
        {selectedUser.societe?.nom_societe}{" "}
      </Typography>
      <Typography>
        <span className="font-bold">Compétences :</span>
        {selectedUser.competences?.map((competence, index) => (
          <p key={index}>{competence.titre}</p>
        ))}
      </Typography>
    </Modal>
  );
};

export default DetailsUser;
