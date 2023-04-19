import { Button, Input, Form, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { userGetUserByUsername } from "../util/APIUtils";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { API_BASE_URL } from "../constant";
import { useForm } from "antd/es/form/Form";

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
    setUserData({ ...userData, username: currentUser.username });
    if (userData.username) connect();
  }, [userData.username]);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
    stompClient.subscribe("/user/" + userData.username + "/message", onPrivateMessage);
  };
  const onError = (error) => {
    console.log(error);
  };
  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats) {
      privateChats.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const [form] = useForm();
  const handleChange = (changedValue, allValues) => {
    const key = Object.keys(changedValue)[0];
    setUserData({ ...userData, [key]: changedValue[key] });
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: receiver.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      privateChats.push(chatMessage);
      setPrivateChats(privateChats);
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
      resetMessageValue("");
      console.log(privateChats);
    }
  };

  function resetMessageValue(value) {
    form.setFieldsValue({ message: value }); // set the value of 'myInput' field to empty
  }

  if (!receiver) return <p>Loading...</p>;
  else
    return (
      <div className="w-full">
        <Typography.Title level={3}>
          {receiver.prenom} {receiver.nom}{" "}
        </Typography.Title>
        {/* Message */}
        
        
        {/* Write message */}
        <div>
          <Form
            form={form}
            onValuesChange={handleChange}
            className="flex fixed bottom-0 right-0 mr-3"
          >
            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: " ",
                },
              ]}
              className="md:w-96"
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
