import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { getChatAnnonceIds, getDiscussions } from '../util/APIUtils';

const MessageLayout = ({currentUser}) => {
  const navigate = useNavigate();
  const [chatAnnonceIds, setChatAnnonceIds] = useState(null);
  const [discussions, setDiscussions] = useState(null);
  const [chats, setChats] = useState([]);
  const  location = useLocation();
  useEffect(() => {
    const loadChatAnnonceIds = async () => {
      try{
        const res = await getChatAnnonceIds(currentUser?.username)
        setChatAnnonceIds(res);
      }catch(error){
        console.log(error);
      }
    }
    loadChatAnnonceIds();
  }, [])

  useEffect(() => {
    console.log(chatAnnonceIds)
    const loadDiscussions = async(idannonce, username) => {
      try{
        const res = await getDiscussions(idannonce, username);
        setDiscussions(res);
      }catch(error){
        console.log(error);
      }
    }
    chatAnnonceIds?.map((annonceId) => loadDiscussions(annonceId, currentUser?.username));
  }, [chatAnnonceIds])
  useEffect(() => {
    console.log(discussions);
    discussions?.map((disc) => {
      if(!chats.find(obj => obj.annonceId===disc.idannonce && obj.receivername===disc.receivername)){
        chats.push({annonceId:disc.idannonce, receivername:disc.receivername});
      }
    })
  }, [discussions])
  useEffect(() => {
    console.log(chats);
  }, [chats])
  
  

  
  
  
  return (
    <Box className="flex h-[533px]" >
        <Box className="h-full w-[200px] lg:w-[300px] bg-white" sx={{borderRight:"1px solid gray"}}>
        <Typography variant='h6' sx={{fontFamily:"Poppins", paddingX:"10px", paddingY:"15px"}}>Discussion</Typography>
      <Divider/>
        
          <Box className="">
               {chats?.map((chat) =>
               chat.receivername!==currentUser.username && 
               <ListItemButton selected={location.pathname==="/dboard/chat/"+chat.annonceId+"/"+chat.receivername} key={chat.receivername+"_"+chat.annonceId} onClick={()=>navigate("/dboard/chat/"+chat.annonceId+"/"+chat.receivername)} sx={{ width:"100%", height:"42px" }} >
                <Typography sx={{ fontSize: "16px", color:"#5d636a", fontFamily: "Wix Madefor Display" }}>
                  {chat.receivername}_{chat.annonceId}
                </Typography>
              </ListItemButton>
              )}
          </Box>
        
        </Box>
        <Box className="h-full grow">
           <Outlet/>
        </Box>
    </Box>
  )
}

export default MessageLayout