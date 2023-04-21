import { Button, Input, Form, List } from "antd";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import {
  getMessages,
  saveMessage,
  userGetUserByUsername,
} from "../util/APIUtils";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { API_BASE_URL } from "../constant";
import Msg from "./Msg";
import AlwaysScrollToBottom from "./AlwaysScrollToTheBottom";

var stompClient = null;
const ChatRoom = ({ currentUser }) => {
  const { username } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [privateChats, setPrivateChats] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });
  const listRef = useRef();

  useEffect(() => {
    const scrollToBottom = () => {
      (listRef?.current)?.scrollToItem(privateChats.length);
    }
    scrollToBottom()
  }, [])
  

  useEffect(() => {
    
    const loadMessages = async () => {
      try {
        const msg = await getMessages(username, currentUser.username);
        if (privateChats && msg.length !== privateChats.length)
          setPrivateChats(msg);
        //scrollToBottom();
      } catch (error) {
        console.log(error);
      }
    };
    // };
    loadMessages();
  }, [privateChats.length]);
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const msg = await getMessages(username, currentUser.username);
        if (privateChats && msg.length !== privateChats.length)
          setPrivateChats(msg);
      } catch (error) {
        console.log(error);
      }
    };
    // };
    loadMessages();
  }, [username]);

  useEffect(() => {
    setUserData({ ...userData, username: currentUser.username });
    if (userData.username) connect();
  }, [userData.username]);

  useEffect(() => {
    const loadReceiver = async () => {
      try {
        const _user = await userGetUserByUsername(username);
        setReceiver(_user);
      } catch (error) {
        console.log(error);
      }
    };
    loadReceiver();
  }, [username]);

  const connect = () => {
    let Sock = new SockJS(API_BASE_URL + "/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
  };
  const onError = (error) => {
    console.log(error);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats) {
      let variable = privateChats;
      variable.push(payloadData);
      setPrivateChats(variable);
      console.log("new message");
    } else {
      let list = [];
      list.push(payloadData);
      setPrivateChats(list);
      console.log("new message");
    }
    console.log(privateChats);
    setUserData(userData);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUserData({ ...userData, [event.target.name]: value });
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        sendername: currentUser.username,
        receivername: receiver.username,
        content: userData.message,
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

  if (!receiver && userData.connected !== true) return <p>Loading...</p>;
  else
    return (
      <div className="w-full relative flex flex-col h-full bg-white">
        <div className="w-full h-12 bg-gray-100 flex justify-start items-center text-2xl absolute top-0">
          {receiver.prenom} {receiver.nom}{" "}
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
