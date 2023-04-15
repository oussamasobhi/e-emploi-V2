import { Breadcrumb, Menu } from "antd";
import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const LayoutES = () => {
  const sideMenuItems = [
    {
      key: "emploi",
      label: <Link to="/emp_serv/emploi">Offres d'emploi</Link>,
    },
    {
      key: "service",
      label: <Link to="/emp_serv/service">Services</Link>,
    },
  ];
  //Breadcrumbs
  const itemsNameMap = {
    "/emp_serv": "Emplois et Services",
    "/emp_serv/emploi": "Offres d'emploi",
    "/emp_serv/service": "Services",
  };
  const location = useLocation();
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
    <div className="flex py-6">
      <div className="w-56 px-3">
        <Menu
          mode="inline"
          defaultSelectedKeys="nettoyage"
          items={sideMenuItems}
          style={{
            height: "100%",
            borderRight: 0,
          }}
        />
      </div>

      <div className="flex-auto pl-10">
        <Breadcrumb items={breadcrumbItems} />

        <Outlet />
      </div>
    </div>
  );
};

export default LayoutES;
