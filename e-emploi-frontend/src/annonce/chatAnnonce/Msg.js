import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const Msg = ({ message, currentUser }) => {
  const { content, sendername, receivername } = message;

  const senderClass =
    sendername === currentUser.username ? "ml-auto" : "mr-auto";

  return (
    <div className={`flex ${senderClass} text-white ${sendername === currentUser.username ? "flex-row-reverse":"flex-row"} `}>
      <Avatar icon={<UserOutlined />} /> {/*To put profile picture */}
      <div
        className={`mx-2 px-3 rounded-lg ${senderClass} ${
          sendername === currentUser.username ? "bg-blue-700" : "bg-gray-500"
        }`}
      >
        <p className="text-medium">{content}</p>
      </div>
    </div>
  );
};

export default Msg;