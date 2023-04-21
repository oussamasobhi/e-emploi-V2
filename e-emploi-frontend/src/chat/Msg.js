import React from "react";

const Msg = ({ message, currentUser }) => {
  const { content, sendername, receivername } = message;

  const senderClass = sendername === currentUser.username ? "ml-auto" : "mr-auto";

  return (
    <div className={`flex ${senderClass} text-white`}>
      <div className={`px-3 rounded-lg ${senderClass} ${sendername === currentUser.username ? "bg-blue-700":"bg-gray-500"}`}>
        <p className="text-medium">{content}</p>
      </div>
    </div>
  );
};

export default Msg;
