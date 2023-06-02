import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import {
  userGetUserByUsername,
  getAnnonceById,
  saveMessage,
  getMessages,
  goToDiscussionEngagee,
  getAnnonceUser,
  addAnnonceUser,
  getSousCategory,
} from "../util/APIUtils";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { API_BASE_URL } from "../constant";
import { List, Button, Input, Typography } from "antd";
import AlwaysScrollToBottom from "./chatAnnonce/AlwaysScrollToTheBottom";
import Msg from "./chatAnnonce/Msg";
import { SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

var stompClient = null;
const ChatRoom = ({ currentUser }) => {
  const username = useParams().username;
  const idAnnonce = useParams().id;
  const [annonce, setAnnonce] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    idannonce: "",
    connected: false,
    message: "",
  });
  const [annonceUser, setAnnonceUser] = useState(null);
  const [postulant, setPostulant] = useState(null);
  const [privateChats, setPrivateChats] = useState([]);
  const [sousCat, setSousCat] = useState(null);
  useEffect(() => {
    const loadAnnonceUser = async () => {
      try{
        const res = await getAnnonceUser(annonce.id, currentUser.id);
        setAnnonceUser(res);
      }catch(error){
        console.log(error);
      }
    }
    
    const createAnnonceUser = async () => {

      const request = { idannonce: annonce?.id };
      try {
        const res = await addAnnonceUser(request);
        console.log(res);
        //setPostuleAnnonce(postuleAnnonce.set(currentUser.username,  ))}

      } catch (error) {
        console.log(error);
      }
    };
    const toDiscussionEngagee = async () => {
      console.log("To discussion engagée............???")
      try {
        const res = await goToDiscussionEngagee(annonce.id, postulant.id);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    if(annonce?.userResponse?.username !== currentUser.username){
      loadAnnonceUser();
    }
    if(privateChats.length===1){
      createAnnonceUser();
    }
    privateChats.map((obj) => {
      console.log(obj.sendername)
      if(obj.sendername === annonce?.userResponse.username){
          if(postulant)toDiscussionEngagee();
          return;
        }
    })
  }, [annonce, currentUser, privateChats])
  useEffect(() => {
    console.log(annonceUser)
  }, [annonceUser])
  useEffect(() => {
    console.log(annonce);
    const loadSouscategorie = async () => {
        try{
            const res = await getSousCategory(annonce.categorie1Annonce);
            setSousCat(res);
        }catch(error){
            console.log(error);
        }
    }
    loadSouscategorie();
  }, [annonce])
  
  useEffect(() => {
    const loadReceiver = async () => {
      try {
        const _rec = await userGetUserByUsername(username);
        setReceiver(_rec);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) loadReceiver();
    setUserData({ ...userData, username: currentUser.username });
    if (idAnnonce) connect();
    const loadMessages = async () => {
      try {
        const msg = await getMessages(
          currentUser.username,
          idAnnonce,
          username
        );
        setPrivateChats(msg);
      } catch (error) {
        console.log(error);
      }
    };
    loadMessages();
    console.log(privateChats);
    //if(username, idAnnonce) loadMessages();
    //console.log(receiver);
  }, []);
  useEffect(() => {
    //console.log(username);
    //console.log(idAnnonce);
    const loadReceiver = async () => {
      try {
        const _rec = await userGetUserByUsername(username);
        setReceiver(_rec);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) loadReceiver();
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
    stompClient.subscribe("/user/" + idAnnonce + "/private", onPrivateMessage);
  };
  const onError = (error) => {
    console.log(error);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    loadMessages();
    privateChats.map((obj) => {
      console.log(obj.sendername)
      if(obj.sendername === annonce?.userResponse.username){
          if(postulant)toDiscussionEngagee();
          return;
        }
    })
  };
  const toDiscussionEngagee = async () => {
    console.log("To discussion engagée............???")
    try {
      const res = await goToDiscussionEngagee(annonce.id, postulant.id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (privateChats && receiver && annonce) {
      setPostulant(
        annonce?.userResponse.username === currentUser.username ? receiver : currentUser
      );
    }
  }, [privateChats, annonce, receiver]);

  useEffect(() => {
   console.log(postulant);
  }, [postulant])
  
  

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
      const res = await saveMessage(message);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  function resetMessageValue(value) {
    setUserData({ ...userData, message: value });
  }

  const loadMessages = async () => {
    try {
      const msg = await getMessages(currentUser.username, idAnnonce, username);
      setPrivateChats(msg);
    } catch (error) {
      console.log(error);
    }
  };

  if (!receiver && !userData.connected) return <p>Loading...</p>;
  else
    return (
      <div className="h-[533px] flex justify-center">
        <div className="w-full relative flex flex-col h-full bg-white  rounded-md shadow-md">
          <div className="flex justify-between items-start p-2 bg-blue-50">
            <div className="flex flex-col ">
              <Typography className="text-xl font-caption text-blue-800 flex-auto">
                {sousCat?.nom_sous_categorie}
              </Typography>
            </div>
            <div className="flex flex-col">
              <Typography
                className="text-xl font-roboto no-underline w-fit flex-none"
              >
                {receiver?.prenom} {receiver?.nom}{" "}
              </Typography>
            </div>
          </div>

          {/* Message */}
          <List
            className="overflow-y-auto mb-12 h-96"
            itemLayout="horizontal"
            dataSource={privateChats}
            locale={{ emptyText: " " }}
            //ref={listRef}
            renderItem={(item, index) => (
              <List.Item>
                <Msg
                  key={index}
                  receiver={receiver}
                  currentUser={currentUser}
                  message={item}
                />
              </List.Item>
            )}
          >
            <AlwaysScrollToBottom />
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
      </div>
    );
};

export default ChatRoom;
