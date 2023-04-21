import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { getAnnonceById, uploadFile } from "../util/APIUtils";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Button, Image } from "antd";

const AnnonceDetail = ({ currentUser }) => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  useEffect(() => {
    const loadAnnonce = async () => {
      try {
        const _annonce = await getAnnonceById(id);
        setAnnonce(_annonce);
      } catch (error) {
        console.log(error);
      }
    };
    loadAnnonce();
  }, [id]);

  if (annonce) console.log(annonce);

  const postuler = async () => {
    /*try{
        const res = await addAnnonceuser()
    }catch(error){
        console.log(error);
    }*/
  };
  const [fileUploaded, setFileUploaded] = useState(null);
  useEffect(() => {
    console.log(fileUploaded);
  }, [fileUploaded]);
  const handleFileChange = (event) => {
    setFileUploaded(event.target.files[0]);
  };
  const addFile = async () => {
    console.log(fileUploaded);
    const formData = new FormData();
    formData.append("file", fileUploaded);
    try {
      await uploadFile(formData);
    } catch (error) {
      console.log(error);
    }
  };

  //if(annonce.userResponse) console.log(currentUser.username === annonce.userResponse.username);
  if (!annonce) return <p>Loading...</p>;
  else
    return (
      <>
        <div>
          <div>
            <p className="text-xl">Partie annonce</p>
            <p>Titre : {annonce.titre_annonce}</p>
            <p>Description : {annonce.description} </p>{" "}
            <p>Type d'annonce : {annonce.categorie2Annonce} </p>
            <p>Tarif : {annonce.tarif_depart} DH</p>
            <p>{dayjs(annonce.createdAt).format("YYYY/MM/DD")} </p>
          </div>
          <div>
            <p className="text-xl">Partie utilisateur</p>
            <p>
              Nom : {annonce.userResponse.nom} {annonce.userResponse.prenom}
            </p>
            <p>Email : {annonce.userResponse.email} </p>
            <p>Telephone : {annonce.userResponse.num_tel} </p>
            <Link to={"/" + annonce.userResponse.username}>
              Consulter mon profil
            </Link>
          </div>
          {currentUser.username !== annonce.userResponse.username && (
            <Button onClick={postuler}>Postuler</Button>
          )}
          {currentUser.username === annonce.userResponse.username && (
            <>
              <Button>Modifier</Button>
              <Button>Supprimer</Button>
            </>
          )}
        </div>
        {/*test adding file*/}
        <div>
          <input type="file" onChange={handleFileChange} />
          {fileUploaded && <Image src={fileUploaded} />}
          <Button onClick={addFile}>Ajouter</Button>
          <p className="text-xl">Boîte de récéption</p>
        </div>
      </>
    );
};

export default AnnonceDetail;
