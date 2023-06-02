import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'

const MessageLayout = ({currentUser}) => {
  return (
    <Box className="flex h-[533px]" >
        <Box className="h-full w-[200px] lg:w-[300px] p-3 bg-white" sx={{borderRight:"1px solid gray"}}>
            Discussions
        </Box>
        <Box className="h-full grow">
           <Outlet/>
        </Box>
    </Box>
  )
}

export default MessageLayout