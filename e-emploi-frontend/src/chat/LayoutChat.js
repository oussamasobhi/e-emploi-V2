import { Input, List, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { getChatUsers } from "../util/APIUtils";

const LayoutChat = ({ currentUser }) => {
 
  const [chatUsers, setChatUsers] = useState(null);

  useEffect(() => {
    const loadChatUsers = async () => {
      try {
        const res = await getChatUsers(currentUser.username);
        setChatUsers(res);
      } catch (error) {
        console.log(error);
      }
    };
    loadChatUsers();
  }, []);

  useEffect(() => {
    console.log(chatUsers);
  }, [chatUsers]);

  return (
    <div className="grid grid-cols-3 font-roboto">
      <div className="py-6 px-3 bg-slate-100 overflow-y-auto h-135">
        <Input.Search />
        {chatUsers && (
          <List
            itemLayout="horizontal"
            dataSource={chatUsers}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={
                    <Link to={"/message/" + item.username}>
                      {item.nom} {item.prenom}
                    </Link>
                  }
                  description=""
                />
              </List.Item>
            )}
          />
        )}
      </div>

      <div className="col-span-2 pl-10">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutChat;
