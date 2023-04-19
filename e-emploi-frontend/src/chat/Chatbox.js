import { Button, Input, Form, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { userGetUserByUsername } from "../util/APIUtils";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { API_BASE_URL } from "../constant";

var stompClient = null;
const Chatbox = (currentUser) => {
  const {username} = useParams();
const [receiver, setReceiver] = useState(null);

useEffect(() => {
  const loadReceiver = async () => {
    try{
      const _user = userGetUserByUsername(username);
      setReceiver(_user);
    }catch(error){
      console.log(error);
    }
  }
  loadReceiver();
}, [username])



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
          <Form className="flex fixed bottom-0 right-0 mr-3">
            <Form.Item name="search" className="md:w-96">
              <Input placeholder="Message" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="ml-6">
                <SendOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
};

export default Chatbox;
