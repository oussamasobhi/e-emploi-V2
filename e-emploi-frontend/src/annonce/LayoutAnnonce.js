import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router";

const LayoutAnnonce = () => {
  return (
    <Layout>
      <Layout.Sider className="">
        <div className="bg-white h-full">This is the left part</div>
      </Layout.Sider>
      <Layout.Content>
        <div className="flex-nowrap justify-center w-auto">
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default LayoutAnnonce;
