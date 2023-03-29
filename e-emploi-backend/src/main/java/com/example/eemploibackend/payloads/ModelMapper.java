package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Adresse_societe;
import com.example.eemploibackend.model.Societe;
import com.example.eemploibackend.model.User;

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
               userResponse.setPhoto_profil(user.getPhoto_profil());
               userResponse.setUsername(user.getUsername());
               userResponse.setRole(user.getRole().getName().name());
               userResponse.setSociete(user.getSociete());
               userResponse.setAdresses(user.getAdresses());
               userResponse.setCompetences(user.getCompetences());
               userResponse.setAdresseSocietes(societe.getAdresses_societes());
               return userResponse;
    }
}
