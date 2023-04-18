import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { getAnnonceById } from "../util/APIUtils";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Button } from "antd";

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
  //if(annonce.userResponse) console.log(currentUser.username === annonce.userResponse.username);
  if (!annonce) return <p>Loading...</p>;
  else
    return (
      <>
        <div>
          <div>
            <p  className="text-xl">Partie annonce</p>
            <p>Titre : {annonce.titre_annonce}</p>
            <p>Description : {annonce.description} </p>{" "}
            <p>Type d'annonce : {annonce.categorie2Annonce} </p>
            <p>Tarif : {annonce.tarif_depart} DH</p>
            <p>{dayjs(annonce.createdAt).format("YYYY/MM/DD")} </p>
          </div>
          <div>
          <p  className="text-xl">Partie utilisateur</p>
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
        <div>
        <p  className="text-xl">Boîte de récéption</p>
        </div>
      </>
    );
};

export default AnnonceDetail;
