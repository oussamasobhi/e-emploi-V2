import { Button, Space, Input, Form, InputNumber } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";

const Chatbox = (currentUser) => {
  const [messages, setMessages] = useState(null);
  useEffect(() => {
    setMessages([
      {
        id: 1,
        content: "Hello you, how are you, I'm fine thank God !",
        date: "2023-04-18 12:36:49",
        user1: "nirina",
        user2: "aina",
      },
      {
        id: 2,
        content: "I'm fine thank you, how's life?",
        date: "2023-04-18 12:37:05",
        user1: "aina",
        user2: "nirina",
      },
      {
        id: 3,
        content: "It's going well, sometimes hard",
        date: "2023-04-18 12:37:45",
        user1: "nirina",
        user2: "aina",
      },
      {
        id: 4,
        content: "What about yours?",
        date: "2023-04-18 12:37:59",
        user1: "nirina",
        user2: "aina",
      },
      {
        id: 5,
        content:
          "Likewise, sometimes it' a litle bit harder but I'm just trying to keep it up",
        date: "2023-04-18 12:38:20",
        user1: "aina",
        user2: "nirina",
      },
    ]);
  }, []);

  return (
    <div className="w-full">
      {/* Message */}

      {messages?.map((msg, index) => (
        <div
        key={index}
          className={
            "flex w-full " + (msg.user1 === "nirina" ? "flex-row-reverse" : "")
          }
        >
          <p className="font-bold text-orange-600"> &nbsp;{msg.user1}&nbsp;</p>
          <p>{msg.content} </p>
          {/*<p className="text-sm">{dayjs(msg.date).format("DD-MM-YYYY")} </p>*/}
        </div>
      ))}
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
