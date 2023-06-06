package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.*;

import java.util.List;

public class ModelMapper {
    public static UserResponse mapUserToUserResponse(User user){
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
               userResponse.setStatus(user.getStatusUser());
               return userResponse;
    }
    public static AnnonceResponse mapannonceToAnnonceResponse(Annonce annonce) {
        AnnonceResponse annonceResponse = new AnnonceResponse();
        annonceResponse.setId(annonce.getId());
       annonceResponse.setAnnonceUsers(annonce.getAnnonceUsers());
       annonceResponse.setCategorie1Annonce(annonce.getCategorie1Annonce().getId());
       //annonceResponse.setCategorie2Annonce(annonce.getCategorie2Annonce().getId());
       annonceResponse.setDate(annonce.getDate());
       annonceResponse.setDuree(annonce.getDuree());
       annonceResponse.setStatusAnnonce(annonce.getStatusAnnonce());
       annonceResponse.setAdresse(annonce.getAdresse());
       annonceResponse.setImages(annonce.getImages());
       annonceResponse.setInfos_complementaire(annonce.getInfos_complementaire());
       annonceResponse.setUserResponse(ModelMapper.mapUserToUserResponse(annonce.getUser()));
        return annonceResponse;
    }
}
