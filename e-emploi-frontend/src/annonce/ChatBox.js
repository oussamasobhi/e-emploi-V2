import React from 'react'
import { useParams } from 'react-router'

const ChatBox = () => {
    const {idAnnonce} = useParams();
  return (
    <div>param : {idAnnonce} </div>
  )
}

export default ChatBox