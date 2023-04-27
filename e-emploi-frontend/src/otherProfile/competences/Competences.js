import React, { useEffect, useState } from "react";
import { getSkills, getSkillsByUsername } from "../../util/APIUtils";
import { Button, Typography } from "antd";
import CompetenceItem from "./CompetenceItem";
import AddCompetence from "./AddCompetence";
import { PlusOutlined } from "@ant-design/icons";

const Competences = ({ notify, currentUser, user }) => {
  const [competences, setCompetences] = useState([{}]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const isCurrentUser = currentUser.username === user.username;

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await getSkillsByUsername(user.username);
        setCompetences(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadSkills();
  }, [user.username]);

  const ajouterCompetence = () => {
    setIsOpenAdd(true);
  };
  const refreshSkills = async () => {
    try {
      const res = await getSkills();
      console.log(res)
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
          {isCurrentUser && (
            <Button icon={<PlusOutlined/>} type="primary" onClick={ajouterCompetence}>
              Ajouter
            </Button>
          )}
        </div>
        {competences?.map((competence, index) => (
          <CompetenceItem
            competence={competence}
            key={index}
            refresh={refreshSkills}
            notify={notify}
            isCurrentUser={isCurrentUser}
          />
        ))}
      </div>
      {isCurrentUser && (
        <AddCompetence
          open={isOpenAdd}
          closeModal={() => setIsOpenAdd(false)}
          refresh={refreshSkills}
          notify={notify}
        />
      )}
    </>
  );
};

export default Competences;
