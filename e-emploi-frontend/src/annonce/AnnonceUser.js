import React, { useEffect, useState } from "react";
import {
  getAnnonceById,
  userGetUserByUsername,
  getPostuleFiles,
} from "../util/APIUtils";
import { Image, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { CheckOutlined, MessageTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AnnonceUser = ({ idannonce, username }) => {
  const navigate = useNavigate();
  const [annonce, setAnnonce] = useState(null);
  const [user, setUser] = useState(null);
  const [myFiles, setMyFiles] = useState(null);
  useEffect(() => {
    const loadAnnonce = async () => {
      try {
        const _res = await getAnnonceById(idannonce);
        setAnnonce(_res);
      } catch (error) {
        console.log(error);
      }
    };
    if (idannonce) loadAnnonce();
  }, [idannonce]);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const _res = await userGetUserByUsername(username);
        setUser(_res);
      } catch (error) {
        console.log(error);
      }
    };
    if (username) loadUser();
  }, [username]);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await getPostuleFiles(annonce.id, user.id);
        //console.log(res);
        setMyFiles(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (annonce && user) loadFiles();
  }, [annonce, user]);
  useEffect(() => {
    console.log(myFiles);
  }, [myFiles]);

  return (
    <>
      {myFiles && (
        <div className="px-2">
          <div className="flex justify-between items-center">
            <Link to={"/annonce/" + idannonce + "/"  + user.username} className="text-lg font-semibold">
              {user.prenom} {user.nom}
            </Link>
            <button
              className="text-sm font-caption mx-3 flex justify-between items-center border-0 bg-orange-500 hover:bg-orange-600 transition-colors ease-in-out cursor-pointer rounded-xl text-white py-1"
            >
              <CheckOutlined className="mr-2"/>
              Confirmer 
            </button>
          </div>

          {myFiles.length > 0 && (
            <div className="border border-red border-spacing-2">
              <div className="flex flex-wrap justify-start">
                {myFiles.map((file, index) => (
                  <Image
                    key={index}
                    style={{
                      objectFit: "cover",
                      margin: "0.5rem",
                      width: 120,
                      height: 120,
                      "@media screen and (minWidth: 640px)": {
                        objectFit: "cover",
                        width: 140,
                        height: 140,
                      },
                      "@media screen and (minWidth: 768px)": {
                        objectFit: "cover",
                        width: 160,
                        height: 160,
                      },
                      "@media screen and (minWidth: 1024px)": {
                        objectFit: "cover",
                        width: 180,
                        height: 180,
                      },
                    }}
                    src={require("../public/files/" + file.name)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AnnonceUser;
