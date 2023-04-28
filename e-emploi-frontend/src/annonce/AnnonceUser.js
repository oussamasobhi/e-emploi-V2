import React, { useEffect, useState } from "react";
import {
  getAnnonceById,
  userGetUserByUsername,
  getPostuleFiles,
} from "../util/APIUtils";
import { Image, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { MessageTwoTone } from "@ant-design/icons";
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
          <div className="flex ">
            <Link to={"/annonce/" + idannonce + "/"  + user.username} className="text-lg font-semibold">
              {user.prenom} {user.nom}
            </Link>
            {/*<Button
              onClick={navigate("/annonce/" + idannonce + "/" + user.username)}
              icon={<MessageTwoTone />}
              className="text-lg font-semibold mx-3"
            >
              Message
            </Button>*/}
          </div>

          {myFiles.length > 0 && (
            <div>
              <Typography className="font-serif text-xl underline underline-offset-2">
                Pièces jointes :{" "}
              </Typography>
              <div className="flex flex-wrap justify-start">
                {myFiles.map((file, index) => (
                  <Image
                    key={index}
                    style={{
                      objectFit: "cover",
                      margin: "0.5rem",
                      width: 120,
                      height: 120,
                      "@media screen and (min-width: 640px)": {
                        objectFit: "cover",
                        width: 140,
                        height: 140,
                      },
                      "@media screen and (min-width: 768px)": {
                        objectFit: "cover",
                        width: 160,
                        height: 160,
                      },
                      "@media screen and (min-width: 1024px)": {
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
