package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.User;

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
               userResponse.setPhoto_profil(user.getPhoto_profil());
               userResponse.setUsername(user.getUsername());
               return userResponse;
    }
}
