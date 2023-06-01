import { Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAnnonceUserByIdUser, getCurrentUser, getPostulationsByUserId } from '../util/APIUtils';
import Proposition from './Proposition';

const Propositions = () => {
    const [propositions, setPropositions] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const loadCurrentUser = async () => {
            try{
                const res = await getCurrentUser();
                setCurrentUser(res);
            }catch(error){
                console.log(error);
            }
        }
        loadCurrentUser();      
    }, [])
    useEffect(() => {
        const loadPropositions = async () => {
            try{
                const res = await getPostulationsByUserId(currentUser.id);
                setPropositions(res);
            }catch(error){
                console.log(error);
            }
          }
         if(currentUser) loadPropositions();
    }, [currentUser])
    

    useEffect(() => {
      console.log(propositions)
    }, [propositions])

  return (
    <Box className="p-4" >
    <Box className="w-full flex">
    <Box  className="w-full grid grid-cols-1">
      <Typography variant="h4" sx={{fontFamily:"Poppins", fontWeight:"bold"}} >Mes propositions</Typography>
      <Box className="my-3">
        <Toolbar>
        <Button variant='outlined' sx={{borderRadius:"28px", size:"medium", marginRight:"14px"}}>En cours</Button>
        <Button variant="outlined" sx={{borderRadius:"28px", size:"medium"}} >Terminé</Button>
        </Toolbar>
      </Box>

    <table>
        <thead>
            <tr>
                <td>
                        id
                </td>
                <td>
                    Catégorie
                </td>
                <td>
                    Utilisateur
                </td>
                <td>
                   Status
                </td>
            </tr>
        </thead>
        <tbody>
           {propositions?.map((proposition, index) => (
            <Proposition key={index} proposition={proposition} currentUser={currentUser} />
           )) }
        </tbody>
    </table>

    </Box>
    </Box>
</Box>
  )
}

export default Propositions