import React, { useState } from "react";
import { Button, Input, Form, Modal, Space, DatePicker } from "antd";
import { updateSkill } from "../../../util/APIUtils";

import dayjs from "dayjs";
import { dateFormat } from "../../../constant";

const EditCompetence = ({competence, open, refresh, closeModal, notify}) => {
    const [newCompetence, setNewCompetence] = useState(competence);
    const handleChange = (changedValue, allValues) => {
        const key = Object.keys(changedValue)[0];
        setNewCompetence({ ...competence, [key]: changedValue[key] });
      };
      const reset = (e) => {
        e.preventDefault();
        setNewCompetence(competence);
        closeModal();
      };
      const modifierCompetence = async (event) => {
        event.preventDefault();
        try {
          await updateSkill(competence.id, newCompetence);
          refresh();
          reset(event);
          notify("Notification", "Compétence modifiée avec succès", "success");
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
        <Button type="primary" onClick={modifierCompetence}>
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
            initialValue={competence.titre}
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
            initialValue={competence.niveauscolaire}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Durée de formation"
            name="duree_formation"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={competence.duree_formation}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Durée d'expérience"
            name="duree_exp"
            rules={[
              {
                required: false,
              },
            ]}
            initialValue={competence.duree_exp}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Date d'obtention"
            name="date_obtention"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <DatePicker defaultValue={dayjs(competence.date_obtention, dateFormat)} format={dateFormat} className="w-full" />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default EditCompetence;
