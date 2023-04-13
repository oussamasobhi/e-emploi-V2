import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserByUsername } from "../../util/APIUtils";

const Profil2 = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const loadUser = async () => {
    try {
      const _user = await getUserByUsername(username);
      setUser(_user);
    } catch (error) {
      console.log(error);
    }
  };
  loadUser();
  return (
    <div>
      The parameter is : {username} <br />
      The name of the user is : {user.nom}
    </div>
  );
};

export default Profil2;
