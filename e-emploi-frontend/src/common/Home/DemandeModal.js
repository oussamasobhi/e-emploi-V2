import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

const DemandeModal = ({isOpenDemande, setIsOpenDemande}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


  return (
    <Modal
  open={isOpenDemande}
  onClose={setIsOpenDemande(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
    <Button onClick={()=>setIsOpenDemande(false)} >Fermer</Button>
  </Box>
</Modal>
  )
}

export default DemandeModal