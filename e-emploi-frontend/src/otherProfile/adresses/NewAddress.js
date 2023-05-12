import React, {useState} from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { getCurrentUser, addAddress} from '../../util/APIUtils';
import { pays } from '../../constant/pays';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const NewAddress = ({open, closeModal, setCurrentUser, notify}) => {
    const [address, setAddress] = useState({
        pays: "",
        ville: "",
        lib_addre: "",
      });

      const handleChange = (event) => {
        const value =event.target.value;
        setAddress({ ...address, [event.target.name]: value });
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
        <div className='grid grid-cols-2'>
        <FormControl variant="standard" sx={{ marginRight:"5px", minWidth: 120 }}>
              <InputLabel>Pays</InputLabel>
              <Select
                value={address.pays}
                defaultValue=""
                onChange={handleChange}
                label="Pays"
                name="pays"
              >
                {pays?.map((pays, index) => (
                  <MenuItem key={index} value={pays}>
                    {pays}
                  </MenuItem>
                ))}
              </Select>
        </FormControl>
        <TextField variant='standard' fullWidth label="Ville" value={address.ville} name='ville' onChange={handleChange} sx={{marginBottom:"10px", marginLeft:"5px"}} />
        </div>
        <TextField variant='standard' fullWidth label="Rue" value={address.lib_addre} name='lib_addre' onChange={handleChange} sx={{marginBottom:"10px"}} />

        
      </Modal>
  )
}

export default NewAddress