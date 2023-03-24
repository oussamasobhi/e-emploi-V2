package com.example.eemploibackend.utils;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.UserSummary;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
@RequiredArgsConstructor
public class MapperUserSummary {
    @Autowired
    private final UserRepository userRepository;
    public UserSummary mappeusertousersummary(User user){
        UserSummary userSummary=new UserSummary();
        List<Adresse> adresseList=userRepository.findaddressesbyuserid(user.getId());
        userSummary.setAdresses(adresseList);
        userSummary.setNom(user.getNom());
        userSummary.setEmail(user.getEmail());
        userSummary.setCIN(user.getCIN());
        userSummary.setSociete(user.getSociete());
        userSummary.setUsername(user.getUsername());
        userSummary.setPrenom(user.getPrenom());
        userSummary.setNum_tel(user.getNum_tel());
        userSummary.setDate_naissance(user.getDate_naissance());
        userSummary.setPhoto_profil(user.getPhoto_profil());
        return userSummary;
    }
}
