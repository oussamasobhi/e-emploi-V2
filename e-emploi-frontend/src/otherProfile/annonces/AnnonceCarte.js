import React, { useEffect, useState } from "react";
import { Avatar, Image, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getAnnonceFiles } from "../../util/APIUtils";

const AnnonceCarte = ({ annonce }) => {
  const navigate = useNavigate();
  const [myAnnonceFiles, setMyAnnonceFiles] = useState(null);
  useEffect(() => {
    const loadAnnonceFiles = async () => {
      try {
        const res = await getAnnonceFiles(annonce.id);
        setMyAnnonceFiles(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (annonce) loadAnnonceFiles();
  }, [annonce]);
  useEffect(() => {
    console.log(myAnnonceFiles)
  }, [myAnnonceFiles]);

  return (
    <div className="flex flex-col ">
      <div className="h-44 w-full overflow-hidden rounded-md bg-gray-400 flex items-center justify-center">
        {myAnnonceFiles && myAnnonceFiles.length > 0 && (
          <img
            src={require("../../public/files/"+myAnnonceFiles[0].name)}
            className="w-full h-full object-cover  cursor-pointer hover:translate-y-1 hover:scale-110 transition-transform"
          />
        )}{!myAnnonceFiles || myAnnonceFiles.length <= 0 && (
          <Typography className="text-white text-2xl">Photo</Typography>
        )}
      </div>

      <div className="flex flex-col">
        <div className="pt-3 flex justify-between items-start">
          <button
            onClick={() => {
              navigate("/annonce/" + annonce.id);
            }}
            className="cursor-pointer text-xs bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out py-2 px-4 text-white font-roboto border-0 rounded-xl"
          >
            Voir détails
          </button>
          <div className="flex flex-col">
            <div className="text-gray-500 font-roboto text-sm">
              {dayjs(annonce.createdAt).format("DD MMMM YYYY")}
            </div>
            <Typography className="font-archivo text-red-500 font-bold text-right">
              {annonce.tarif_depart} DH
            </Typography>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start mb-1">
          <div className="text-2xl font-bold truncate-words max-w-20">
            {annonce?.titre_annonce?.substring(0, 60)}
          </div>
          <div className="text-gray-400 text-sm">
            {annonce?.categorie2Annonce}
          </div>
        </div>

        <div className="flex items-center justify-start py-3">
          {!annonce?.userResponse?.photo_profil && (
            <Avatar icon={<UserOutlined />} className="mr-3" />
          )}
          {annonce?.userResponse?.photo_profil && (
            <Avatar
              src={require("../../public/files/" +
                annonce?.userResponse?.photo_profil?.name)}
              className="mr-3"
            />
          )}
          <span className="font-roboto mr-3 text-gray-500">Publiée par </span>
          <Link
            to={"/" + annonce?.userResponse.username}
            className="font-caption text-black hover:text-black active:text-black transition-all ease-in-out hover:underline"
          >
            {annonce?.userResponse?.prenom} {annonce?.userResponse?.nom}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnonceCarte;
