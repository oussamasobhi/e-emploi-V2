package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.*;

import java.util.List;

public class ModelMapper {
    public static UserResponse mapUserToUserResponse(User user){
               Societe societe=user.getSociete();
               UserResponse userResponse=new UserResponse();
               userResponse.setId(user.getId());
               userResponse.setNom(user.getNom());
               userResponse.setPrenom(user.getPrenom());
               userResponse.setCIN(user.getCIN());
               userResponse.setDate_naissance(user.getDate_naissance());
               userResponse.setEmail(user.getEmail());
               userResponse.setNum_tel(user.getNum_tel());
               userResponse.setPhoto_profil(user.getImage());
               userResponse.setUsername(user.getUsername());
               userResponse.setRole(user.getRole().getName().name());
               userResponse.setSociete(user.getSociete());
               userResponse.setAdresses(user.getAdresses());
               userResponse.setCompetences(user.getCompetences());
if(societe!=null)   userResponse.setAdresseSocietes(societe.getAdresses_societes());
               return userResponse;
    }
    public static AnnonceResponse mapannonceToAnnonceResponse(Annonce annonce) {
        UserResponse userResponse = ModelMapper.mapUserToUserResponse(annonce.getUser());
        AnnonceResponse annonceResponse = new AnnonceResponse();
        annonceResponse.setId(annonce.getId());
        annonceResponse.setCreatedAt(annonce.getCreatedAt());
        annonceResponse.setTitre_annonce(annonce.getTitre_annonce());
        annonceResponse.setCategorie2Annonce(annonce.getCategorie2Annonce().getNom_sous_categorie());
        annonceResponse.setCategorieAnnonce(annonce.getCategorie2Annonce().getCategorieAnnonce().getNom_categorie());
        annonceResponse.setDate_fin_annonce(annonce.getDate_fin_annonce());
        annonceResponse.setDescription(annonce.getDescription());
        annonceResponse.setTarif_depart(annonce.getTarif_depart());
        annonceResponse.setTarif_final(annonce.getTarif_final());
        annonceResponse.setUserResponse(userResponse);
        return annonceResponse;
    }
}
