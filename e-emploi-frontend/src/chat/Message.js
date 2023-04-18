import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'

const Message = (message) => {
  
  return (
    <>
        <Avatar icon={UserOutlined} />
        <div>{message.content} </div>
        <div>{message.date}</div>
    </>
  )
}

export default Message