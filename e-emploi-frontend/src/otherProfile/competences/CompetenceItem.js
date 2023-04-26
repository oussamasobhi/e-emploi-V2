import { Typography, Button, Modal, Image } from "antd";
import React, { useEffect, useState } from "react";
import {
  deleteSkill,
  getCompetenceFiles,
  getSkillsByUsername,
  uploadCompetenceFile,
} from "../../util/APIUtils";
import EditCompetence from "./EditCompetence";
import { PlusCircleOutlined } from "@ant-design/icons";

const CompetenceItem = ({ competence, refresh, notify, isCurrentUser }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  useEffect(() => {
    console.log(competence);
  }, [competence]);

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

  const [fileValue, setFileValue] = useState(null);
  const [allFiles, setAllFiles] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await getCompetenceFiles(competence?.id);
        //console.log(res);
        setAllFiles(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (competence.id !== undefined && competence.id !== null) loadFiles();
  }, [competence]);

  const handleFileChange = (event) => {
    setFileValue(event.target.files[0]);
  };
  const handleAddFile = async () => {
    const formData = new FormData();
    formData.append("file", fileValue);
    try {
      const res = await uploadCompetenceFile(competence.id, formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    refresh();
  };
  const [myPath, setMyPath] = useState(null)

    
    console.log(allFiles);
    try {
      allFiles?.map((file) => (
        <Image src={"../../public/files/"+file.name} />
      ));
    } catch (error) {
      console.log(error);
    }

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
        <div className="flex justify-between">
          <input type="file" name="document" onChange={handleFileChange} />
          <Button type="text" onClick={handleAddFile}>
            <PlusCircleOutlined />{" "}
          </Button>
        </div>
      </div>
      {allFiles?.map((file) => (
        <Image src={require("../../public/files/"+file.name)} />
      ))}
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
