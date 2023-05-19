import { Box, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import OnEditBox from "./OnEditBox";
import { myTheme } from "../theme";
const InfoElement = ({titreField, nameField, valueField, setUser, user}) => {
    const [onEdit, setOnEdit] = useState(false);
    const testclick = () =>{
        console.log("clicked");
        setOnEdit(!onEdit)
    }
       
    return (
        <>
        <Box className="flex justify-between items-center py-4 pr-5" >            
            {!onEdit && <><Box className="flex flex-col">
                <Typography variant='body2' sx={{fontFamily:"Wix Madefor Display"}}>{titreField} </Typography>
                <Typography variant='body1' sx={{fontFamily:"Poppins", fontWeigth:"bold"}}>{valueField} </Typography>
            </Box>
            <Typography onClick={testclick} className="cursor-pointer" variant="subtitle1" sx={{fontFamily:"Poppins", fontWeight:"bold", color:myTheme.palette.blue.second}} >Modifier</Typography>
            </>}
            {onEdit && 
            <OnEditBox nameField={nameField} user={user} setUser={setUser} titreField={titreField} setOnEdit={setOnEdit} onEdit={onEdit} valueField={valueField} />
            }
        </Box>
        <Divider/>
        </>
    )
}

export default InfoElement;