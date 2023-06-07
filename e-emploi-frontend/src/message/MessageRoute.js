import { Box, Typography } from '@mui/material'
import React from 'react'
import ChatRoom from '../annonce/ChatRoom'
import { Route, Routes } from 'react-router'
import MessageLayout from './MessageLayout'

const Message = ({currentUser}) => {
  return (
    <Routes>
      <Route path='/*' element={<MessageLayout currentUser={currentUser} />}>
        <Route index element={<Box className="h-[510px] flex justify-center items-center p-6" > <Typography variant='h5' sx={{fontFamily:"Wix Madefor Display"}} > Ouvrir une discussion</Typography></Box> }/>
        <Route path=':id/:username' element={<ChatRoom currentUser={currentUser} /> } />
        <Route path=':useraname' element={<ChatRoom currentUser={currentUser}/>}/>
      </Route>
    </Routes>
  )
}

export default Message