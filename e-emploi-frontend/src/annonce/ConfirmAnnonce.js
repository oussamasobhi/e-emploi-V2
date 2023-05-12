import { Modal, Typography } from "antd";
import React, {useEffect} from "react";
import { goToAccordEtabli } from "../util/APIUtils";
import {useNavigate} from "react-router-dom";

const ConfirmAnnonce = ({ open, setIsOpen, id }) => {
  const navigate = useNavigate()
  const reset = () => {
    setIsOpen(false);
  };
  const confirmerAnnonce = async () => {
    try {
      const res = await goToAccordEtabli(id?.idannonce, id?.iduser);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    navigate("/annonce"+id);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(id)
  }, [id])
  

  return (
    <Modal
      key={id?.idannonce}
      open={open}
      title="Confirmation"
      onOk={confirmerAnnonce}
      onCancel={reset}
      okText="Confirmer"
      cancelText="Annuler"
      width={300}
    >
      {/*<div className="flex flex-col" key={annonceUser.id + "3"}>
        <Typography>Tarif final pour la proposition : </Typography>
        <div className="flex justify-between items-center">
          <input
            type="number"
            name="tarif_final"
            className="outline-none h-6 focus:border-blue-500 focus:border-1 text-right pr-2 "
          />
          <Typography className="">DH</Typography>
        </div>
  </div>*/}
      <Typography className="font-roboto">
        Voulez vous confirmer cette poroposition?
      </Typography>
    </Modal>
  );
};

export default ConfirmAnnonce;
