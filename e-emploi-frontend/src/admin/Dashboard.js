import React from "react";
import Users from "../user/admin/Users";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Dashboard = ({ notify }) => {
  const location = useLocation();
  //Breadcrumbs
  const itemsNameMap = {
    ["/dashboard"]: "Tableau de bord",
  };

  const currentUrl = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = currentUrl.map((_, index) => {
    const url = `/${currentUrl.slice(0, index + 1).join("/")}`;
    return {
      title: <Link to={url}>{itemsNameMap[url]}</Link>,
    };
  });
  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
    },
  ].concat(extraBreadcrumbItems);
  return (
    <div>
      <div className="flex justify-between items-center p-2 w-full">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Users notify={notify} />
    </div>
  );
};

export default Dashboard;
