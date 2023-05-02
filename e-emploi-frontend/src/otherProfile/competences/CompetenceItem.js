import { Typography, Button, Modal, Image, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import {
  deleteSkill,
  getCompetenceFiles,
  uploadCompetenceFile,
} from "../../util/APIUtils";
import EditCompetence from "./EditCompetence";

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
  const [myPath, setMyPath] = useState(null);

  console.log(allFiles);
  try {
    allFiles?.map((file) => <Image src={"../../public/files/" + file.name} />);
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className="shadow-lg rounded-md mb-6 pb-4 bg-white">
        <div className="flex justify-between items-start mb-3 font-roboto font-semibold px-2  py-3">
          <Typography className="uppercase font-serif font-semibold texet-center text-2xl ">
            {competence.titre}
          </Typography>
          {isCurrentUser && (
            <div>
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
            </div>
          )}
        </div>

        <div className="flex justify-between px-2 ">
          <div className="w-1/2">
            {competence.date_obtention && (
              <div className="">
                <span className="text-gray-500 font-poppins text-lg">
                  Obtention :{" "}
                </span>
                <span className="font-poppins text-lg">
                  {competence.date_obtention}
                </span>
              </div>
            )}
            {competence.duree_exp && (
              <div className="">
                <span className="text-gray-500 font-poppins text-lg">
                  Expérience :{" "}
                </span>
                <span className="font-poppins text-lg">
                  {competence.duree_exp}
                </span>
              </div>
            )}
          </div>
          <div className="w-1/2">
            {competence.duree_formation && (
              <div className="">
                <span className="text-gray-500 font-poppins text-lg">
                  Durée de formation :{" "}
                </span>
                <span className="font-poppins text-lg">
                  {competence.duree_formation}
                </span>
              </div>
            )}
            {competence.niveauscolaire && (
              <div className="">
                <span className="text-gray-500 font-poppins text-lg">
                  Niveau scolaire :{" "}
                </span>
                <span className="font-poppins text-lg">
                  {competence.niveauscolaire}
                </span>
              </div>
            )}
          </div>
        </div>
        {isCurrentUser && (
          <div className="flex my-5 px-2 ">
            <label
              htmlFor="file-input"
              className="relative flex items-center overflow-hidden rounded-md bg-gray-200 text-gray-700 cursor-pointer py-1 px-2 text-sm"
            >
              <span className="block">Ajouter une photo </span>
              <span className="file-name absolute inset-0 z-10 hidden"></span>
              <input
                id="file-input"
                type="file"
                className="opacity-0 absolute inset-0 z-20 cursor-pointer w-full h-full"
                name="document"
                onChange={handleFileChange}
                accept=".jpg, .png"
              />
            </label>
            {fileValue && (
              <Button type="primary" className="mx-2" onClick={handleAddFile}>
                Enregistrer
              </Button>
            )}
          </div>
        )}

        {allFiles && (
          <div className="px-2">
            {allFiles.length > 0 && (
              <div>
                <Typography className="font-serif text-xl underline underline-offset-2">
                  Pièces justificatives :{" "}
                </Typography>
                <div className="flex flex-wrap justify-start">
                  {allFiles.map((file, index) => (
                    <Image
                      key={index}
                      style={{
                        objectFit: "cover",
                        margin: "0.5rem",
                        width: 120,
                        height: 120,
                        "@media screen and (minWidth: 640px)": {
                          objectFit: "cover",
                          width: 140,
                          height: 140,
                        },
                        "@media screen and (minWidth: 768px)": {
                          objectFit: "cover",
                          width: 160,
                          height: 160,
                        },
                        "@media screen and (minWidth: 1024px)": {
                          objectFit: "cover",
                          width: 180,
                          height: 180,
                        },
                      }}
                      src={require("../../public/files/" + file.name)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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
