import React, {useState} from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { getCurrentUser, addAddress} from '../../util/APIUtils';

const NewAddress = ({open, closeModal, setCurrentUser, notify}) => {
    const [address, setAddress] = useState({
        pays: "",
        ville: "",
        lib_addre: "",
      });

      const handleChange = (changedValue, allValues) => {
        const key = Object.keys(changedValue)[0];
        setAddress({ ...address, [key]: changedValue[key] });
      };

      const reset = (e) => {
        e.preventDefault();
        setAddress({
          pays: "",
          ville: "",
          lib_addre: "",
        });
        closeModal();
      };
    
      const ajouterAddresse = async () => {
        try {
          await addAddress(address);
          const res = await getCurrentUser();
          setCurrentUser(res);
          setAddress({
            pays: "",
            ville: "",
            lib_addre: "",
          });
          closeModal();
          //notify("Notification", "Adresse ajouté avec succès !", "success");
          message.success("Adresse ajouté avec succès");
        } catch (error) {
          console.log(error);
        }
      };



  return (
    <Modal
        open={open}
        title="Ajout d'un adresse"
        footer={[
          <Button type="primary" onClick={ajouterAddresse}>
            Enregistrer
          </Button>,
          <Button onClick={reset}>Fermer</Button>,
        ]}
      >
        <Form onValuesChange={handleChange}>
          <div className="mt-2">
            <Form.Item
              label="Rue"
              name="lib_addre"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ville"
              name="ville"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Pays"
              name="pays"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
  )
}

export default NewAddress