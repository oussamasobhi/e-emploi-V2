import React  from "react";
import UserList from "./UserList";

const Users = ({ notify }) => {
  const pages = [10, 30, 50, 100];
  return (
    <div>
      <h1 className="text-center py-3 text-3xl">Gestion des utilisateurs</h1>
      <UserList notify={notify} className="relative z-1" />
    </div>
  );
};

export default Users;
