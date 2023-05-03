import React, { useEffect, useState } from "react";
import {
  getAnnonceById,
  userGetUserByUsername,
  getPostuleFiles,
  getAnnonceUser,
} from "../util/APIUtils";
import { Image, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { CheckOutlined, MessageTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ConfirmAnnonce from "./ConfirmAnnonce";

const AnnonceUser = ({ idannonce, username }) => {
  const navigate = useNavigate();
  const [annonce, setAnnonce] = useState(null);
  const [user, setUser] = useState(null);
  const [myFiles, setMyFiles] = useState(null);
  const [annonceUser, setAnnonceUser] = useState(null);
  useEffect(() => {
    const loadAnnonceUser = async () => {
      try {
        const res = await getAnnonceUser(idannonce, user.id);
        setAnnonceUser(res);
      } catch (error) {
        console.log(error);
      }
    };
    if ((user, idannonce)) {
      loadAnnonceUser();
    }
  }, [idannonce, user]);
  useEffect(() => {
    console.log(annonceUser);
  }, [annonceUser]);

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

  const [isOpenCofirm, setIsOpenConfirm] = useState(false);

  return (
    <>
      {myFiles && (
        <div className="px-2 mb-3 py-2 bg-gray-200">
          <div className="grid grid-cols-3 items-center">
            <Link
              to={"/annonce/" + idannonce + "/" + user.username}
              className="text-lg font-semibold"
            >
              {user.prenom} {user.nom}
            </Link>
            <div className="justify-self-center">
            {annonceUser &&
                  annonceUser.statusAnnonce === "Demande_Envoyé" && (
                    <Typography className="font-poppins text-green-600">
                      Demande envoyée
                    </Typography>
                  )}
                {annonceUser &&
                  annonceUser.statusAnnonce === "Discussion_engagé" && (
                    <Typography className="font-poppins text-green-600">
                      Discussion engagée
                    </Typography>
                  )}
                {annonceUser &&
                  annonceUser.statusAnnonce === "Accord_Etablie" && (
                    <Typography className="font-poppins text-green-600">
                      Accord établi
                    </Typography>
                  )}
                {annonceUser && annonceUser.statusAnnonce === "Terminé" && (
                  <Typography className="font-poppins text-green-600">
                    Terminé
                  </Typography>)}
            </div>
            <div className="w-fit justify-self-end">
              <button onClick={() => setIsOpenConfirm(true)} className="text-sm font-caption mx-3 flex justify-between items-center border-0 bg-orange-500 hover:bg-orange-600 transition-colors ease-in-out cursor-pointer rounded-xl text-white py-1">
                <CheckOutlined className="mr-2" />
                Confirmer
              </button>
            </div>
          </div>

          {myFiles.length > 0 && (
            <div className=" border-spacing-2">
              <div className="flex flex-wrap justify-start">
                {myFiles.map((file, index) => (
                  <Image
                    key={index}
                    className="rounded-md shadow-md "
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
      <ConfirmAnnonce id={annonceUser?.id} open={isOpenCofirm} setIsOpen={setIsOpenConfirm} />
    </>
  );
};

export default AnnonceUser;
