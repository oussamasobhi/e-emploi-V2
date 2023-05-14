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
               return userResponse;
    }
    public static AnnonceResponse mapannonceToAnnonceResponse(Annonce annonce) {
        UserResponse userResponse = ModelMapper.mapUserToUserResponse(annonce.getUser());
        AnnonceResponse annonceResponse = new AnnonceResponse();
        annonceResponse.setId(annonce.getId());
        annonceResponse.setCreatedAt(annonce.getCreatedAt());
        annonceResponse.setCategorie2Annonce(annonce.getCategorie2Annonce().getNom_sous_categorie());
      //  annonceResponse.setCategorieAnnonce(annonce.getCategorie2Annonce().getCategorieAnnonce().getNom_categorie());
        annonceResponse.setUserResponse(userResponse);
        return annonceResponse;
    }
}
