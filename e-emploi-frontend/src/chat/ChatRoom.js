import { Button, Input, Form, List} from "antd";
import React from "react";
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
import { useForm } from "antd/es/form/Form";
import Msg from "./Msg";

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


   useEffect(() => {
    const loadMessages = async () => {
      try {
        const msg = await getMessages(username, currentUser.username);
        if (privateChats && msg.length !== privateChats.length) setPrivateChats(msg);
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
        if (privateChats && msg.length !== privateChats.length) setPrivateChats(msg);
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

  const [form] = useForm();
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setUserData({ ...userData, [key]: changedValue[key] });
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
    form.setFieldsValue({ message: value });
  }

  if (!receiver && userData.connected !== true) return <p>Loading...</p>;
  else
    return (
      <div className="w-full relative grid gap-0 grid-rows-8 h-135 bg-slate-100">
        <div className="row-span-1">
          {receiver.prenom} {receiver.nom}{" "}
        </div>

        {/* Message */}
        <List
          className="overflow-y-auto bg-white"
          itemLayout="horizontal"
          dataSource={privateChats}
          locale={{ emptyText: " " }}
          renderItem={(item, index) => (
            <List.Item>
              <Msg key={index} currentUser={currentUser} message={item} />
            </List.Item>
          )}
        />
        
        {/*Write message */}

        <div className="w-full row-span-2 absolute bottom-0 ">
          <Form
            form={form}
            onValuesChange={handleChange}
            className="flex w-full justify-center items-center mr-3 absolute "
          >
            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: " ",
                },
              ]}
              className="md:w-full"
            >
              <Input placeholder="Message" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="ml-6"
                onClick={sendPrivateValue}
              >
                <SendOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
};

export default ChatRoom;
