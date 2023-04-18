import React from 'react'
import { Route, Routes } from 'react-router'
import Chatbox from './Chatbox';
import LayoutChat from './LayoutChat';

const Chat = () => {
  return (
    <Routes>
        <Route path='/*' element={<LayoutChat/>} >
            <Route path=":username" element={<Chatbox  />} />
             
        </Route>
    </Routes>
  )
}

export default Chat