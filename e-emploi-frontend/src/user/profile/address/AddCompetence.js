import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Space,
} from "antd";
import { addSkill } from "../../../util/APIUtils";

const AddCompetence = ({ open, closeModal, refresh, notify }) => {
  const initCompetence = {
    titre: "",
    niveauscolaire: "",
    duree_formation: "",
    date_obtention: "",
    duree_exp: "",
  };
  const [competence, setCompetence] = useState({
    titre: "",
    niveauscolaire: "",
    duree_formation: "",
    date_obtention: "",
    duree_exp: "",
  });
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setCompetence({ ...competence, [key]: changedValue[key] });
  };
  const reset = (e) => {
    e.preventDefault();
    setCompetence({
      titre: "",
      niveauscolaire: "",
      duree_formation: "",
      date_obtention: "",
      duree_exp: "",
    });
    closeModal();
  };

  const ajouterCompetence = async (event) => {
    event.preventDefault();
    try {
      await addSkill(competence);
      refresh();
      reset(event);
      notify("Notification", "Nouvelle compétence ajoutée", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      title="Ajout d'une Compétence"
      onCancel={reset}
      footer={[
        <Button type="primary" onClick={ajouterCompetence}>
          Enregistrer
        </Button>,
        <Button onClick={reset}>Fermer</Button>,
      ]}
    >
      <Form
        onValuesChange={handleChange}
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues=""
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            label="Titre"
            name="titre"
            rules={[
              {
                required: true,
                message: "Champ titre obligatoire ",
              },
            ]}
            initialValue={initCompetence.titre}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Niveau scolaire"
            name="niveauscolaire"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={initCompetence.niveauscolaire}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            label="Durée de formation"
            name="duree_formation"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={initCompetence.duree_formation}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            label="Durée d'expérience"
            name="duree_exp"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={initCompetence.duree_exp}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            label="Date d'obtention"
            name="date_obtention"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={initCompetence.date_obtention}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default AddCompetence;
