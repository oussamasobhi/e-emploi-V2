import { Breadcrumb, Menu } from "antd";
import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const LayoutDomicile = () => {
  const sideMenuItems = [
    {
      key: "nettoyage",
      label: <Link to="/domicile/nettoyage">Services Nettoyages</Link>,
    },
    {
      key: "artisan",
      label: <Link to="/domicile/artisan">Services Artisans</Link>,
    },
  ];
  //Breadcrumbs
  const itemsNameMap = {
    "/domicile": "Domicile",
    "/domicile/nettoyage": "Services Nettoyages",
    "/domicile/artisan": "Services Artisans",
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

export default LayoutDomicile;
