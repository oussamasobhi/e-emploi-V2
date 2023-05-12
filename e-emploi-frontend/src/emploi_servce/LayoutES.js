import { Breadcrumb } from "antd";
import React, {useState} from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Button, Tab, Tabs } from "@mui/material";

const MENU = [
  {label:"Offres d'mploi", url:"/emp_serv/emploi"},
  {label:"Services", url:"/emp_serv/service"}
]
const LayoutES = () => {
  const [value, setValue] = useState();
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
    <div className="flex bg-gray-100 ">
    <div className="flex-auto px-5">
    <div className="flex items-center border-b border-b-gray-400">
    <Breadcrumb items={breadcrumbItems} />
    <Tabs
            sx={{ marginLeft: "auto" }}
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
            indicatorColor="#f3580c"
          >
            {MENU.map((menu, index) => (
              <Tab
                key={index}
                label={menu.label}
                LinkComponent={Link}
                to={menu.url}
            />
            ))}
          </Tabs>
    </div>

    <Outlet />
  </div>
</div>
  );
};

export default LayoutES;
