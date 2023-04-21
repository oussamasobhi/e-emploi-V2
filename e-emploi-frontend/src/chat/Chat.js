import React from 'react'
import { Route, Routes } from 'react-router'
import ChatRoom from './ChatRoom';
import LayoutChat from './LayoutChat';



const Chat = ({currentUser}) => {
  return (
    <Routes >
        <Route path='/*' element={<LayoutChat currentUser={currentUser}/>} >
            <Route path=":username" element={<ChatRoom currentUser={currentUser} /> } />

        </Route>
    </Routes>
  )
}

export default Chat