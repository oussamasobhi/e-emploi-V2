import React, { useEffect, useState } from "react";
import { addSkill, getSkills } from "../../util/APIUtils";
import { Button, Typography } from "antd";
import Competence from "./skill/Competence";
import AddCompetence from "./address/AddCompetence";

const CompetencesPage = ({ notify }) => {
  const [competences, setCompetences] = useState([{}]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  function closeAddCompetence() {
    setIsOpenAdd(false);
  }
  function openAddCompetence() {
    setIsOpenAdd(true);
  }

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await getSkills();
        setCompetences(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadSkills();
  }, []);

  const ajouterCompetence = () => {
    openAddCompetence();
  };
  const refreshSkills = async () => {
    try {
      const res = await getSkills();
      setCompetences(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border-b">
        <div className="flex justify-between items-center">
          <Typography.Title level={3} className="uppercase text-center">
            Compétences
          </Typography.Title>
          <Button type="primary" onClick={ajouterCompetence}>
            Ajouter
          </Button>
        </div>
        {competences?.map((competence, index) => (
          <Competence
            competence={competence}
            key={index}
            refresh={refreshSkills}
            notify={notify}
          />
        ))}
      </div>
      <AddCompetence
        open={isOpenAdd}
        closeModal={closeAddCompetence}
        refresh={refreshSkills}
        notify={notify}
      />
    </>
  );
};

export default CompetencesPage;
