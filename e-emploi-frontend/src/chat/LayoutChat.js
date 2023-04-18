import { Input, List, Avatar } from "antd";
import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const LayoutChat = () => {
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <div className="flex py-6 font-roboto">
      <div className="w-96 px-3">
        <Input.Search />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<Link href="#">{item.title}</Link>}
                description="Ant Design"
              />
            </List.Item>
          )}
        />
      </div>

      <div className="flex-auto pl-10">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutChat;
