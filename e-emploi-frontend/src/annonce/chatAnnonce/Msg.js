import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const Msg = ({ message, currentUser, receiver }) => {
  const { content, sendername, receivername } = message;

  const senderClass =
    sendername === currentUser.username ? "ml-auto" : "mr-auto";

  return (
    <div
      className={`flex ${senderClass} text-white ${
        sendername === currentUser.username ? "flex-row-reverse" : "flex-row"
      } `}
    >
      {sendername === currentUser.username && currentUser.photo_profil && (
        <Avatar
          className="mx-2"
          src={require("../../public/files/" + currentUser.photo_profil.name)}
        />
      )}
      {sendername === currentUser?.username && !currentUser?.photo_profil && (
        <Avatar className="mx-2" icon={<UserOutlined />} />
      )}
      {sendername !== currentUser.username && !receiver.photo_profil && (
        <Avatar className="mx-2" icon={<UserOutlined />} />
      )}
      {sendername !== currentUser.username && receiver.photo_profil && (
        <Avatar
          className="mx-2"
          src={require("../../public/files/" + receiver.photo_profil.name)}
        />
      )}
      {/*To put profile picture */}
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
