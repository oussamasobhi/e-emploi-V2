import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import {userGetUserByUsername, getAnnonceById, saveMessage, getMessages} from "../util/APIUtils"
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { API_BASE_URL } from "../constant";
import { List, Button, Input, Typography } from "antd";
import AlwaysScrollToBottom from "./chatAnnonce/AlwaysScrollToTheBottom";
import Msg from "./chatAnnonce/Msg";
import { SendOutlined } from "@ant-design/icons";

var stompClient = null;
const ChatRoom = ({currentUser}) => {
  const username = useParams().username;
  const idAnnonce = useParams().id;
  const [annonce, setAnnonce] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    idannonce:"",
    connected: false,
    message: "",
  });
  const [privateChats, setPrivateChats] = useState([])





  useEffect(() => {;
    const loadReceiver = async () => {
        try{
            const _rec = await userGetUserByUsername(username);
            setReceiver(_rec);
        }catch(error){
            console.log(error);
        }
    }
    if(username) loadReceiver();
    setUserData({ ...userData, username: currentUser.username });
    if (idAnnonce) connect();
    const loadMessages = async () => {
        try{
            const msg = await getMessages(currentUser.username, idAnnonce, username);
            setPrivateChats(msg);
        }catch(error){console.log(error)}
      }
    loadMessages();
    console.log(privateChats);
    //if(username, idAnnonce) loadMessages();
    //console.log(receiver);
  }, []);
  useEffect(() => {
    //console.log(username);
    //console.log(idAnnonce);
    const loadReceiver = async () => {
        try{
            const _rec = await userGetUserByUsername(username);
            setReceiver(_rec);
        }catch(error){
            console.log(error);
        }
    }
    if(username) loadReceiver();
    //console.log(receiver);
  }, [username]);

  useEffect(() => {
    const loadAnnonce = async () => {
      try {
        const _annonce = await getAnnonceById(idAnnonce);
        setAnnonce(_annonce);
      } catch (error) {
        console.log(error);
      }
    };
    loadAnnonce();
  }, [idAnnonce]);

  const connect = () => {
    let Sock = new SockJS(API_BASE_URL + "/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + idAnnonce + "/private",
      onPrivateMessage
    );
  };
  const onError = (error) => {
    console.log(error);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    loadMessages();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUserData({ ...userData, [event.target.name]: value });
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      let chatMessage = {
        sendername: currentUser.username,
        receivername: receiver.username,
        content: userData.message,
        idannonce: idAnnonce,
        status: "Envoyé",
        createdAt: new Date(),
      };
      console.log(chatMessage);
      let variable = privateChats;
      variable.push(chatMessage);
      setPrivateChats(variable);

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
      resetMessageValue("");
      console.log(privateChats);
      //storing mesages in DB
      storeMessage(chatMessage);
    }
  };
  const storeMessage = async (message) => {
    try {
      await saveMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  function resetMessageValue(value) {
    setUserData({ ...userData, message: value });
  }

  const loadMessages = async () => {
    try{
        const msg = await getMessages(currentUser.username, idAnnonce, username);
        setPrivateChats(msg);
    }catch(error){console.log(error)}
  }

  
if (!receiver && !userData.connected) return <p>Loading...</p>;
else
  return (
    <div className="w-full relative flex flex-col h-full bg-white">
      <div className="w-full h-12 px-10 bg-gray-100 flex justify-between items-center text-2xl absolute top-0">
       <Typography className="text-xl" >{annonce?.titre_annonce} </Typography>
       <Typography className="text-lg">{receiver?.prenom} {receiver?.nom}</Typography> 
      </div>

      {/* Message */}
        <List
          className="overflow-y-auto my-12 h-114"
          itemLayout="horizontal"
          dataSource={privateChats}
          locale={{ emptyText: " " }}
          //ref={listRef}
          renderItem={(item, index) => (
            <List.Item>
              <Msg key={index} currentUser={currentUser} message={item} />
            </List.Item>
          )}
        >
          <AlwaysScrollToBottom/>
        </List>

      {/*Write message */}

      <div className="w-full flex justify-end absolute bottom-0 py-3 bg-gray-100">
        <Input
          onChange={handleChange}
          name="message"
          value={userData.message}
          placeholder="Ecrire un message..."
        />
        <Button type="primary" onClick={sendPrivateValue}>
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;
