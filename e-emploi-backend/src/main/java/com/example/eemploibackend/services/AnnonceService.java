package com.example.eemploibackend.services;

import com.example.eemploibackend.model.*;
import com.example.eemploibackend.payloads.AnnonceRequest;
import com.example.eemploibackend.repository.AnnonceRepository;
import com.example.eemploibackend.repository.AnnonceUserRepository;
import com.example.eemploibackend.repository.Categorie_2_Annonce_Repository;
import com.example.eemploibackend.repository.UserRepository;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnonceService {
    private final AnnonceUserRepository annonceUserRepository;
    private final AnnonceRepository annonceRepository;
    private final Categorie_2_Annonce_Repository categorie2AnnonceRepository;
    private final UserRepository userRepository;

    public void ajouterannonce(User user, AnnonceRequest request){
        Categorie_2_Annonce categorie2Annonce=categorie2AnnonceRepository.findCategorie_2_AnnonceById(request.getId_categorie2Annonce());
        AnnonceUser annonceUser= AnnonceUser.builder()
                .build();

        Annonce annonce= Annonce.builder()
                .categorie2Annonce(categorie2Annonce)
                .date_fin_annonce(request.getDate_fin_annonce())
                .titre_annonce(request.getTitre_annonce())
                .description(request.getDescription())
                .tarif_depart(request.getTarif_depart())
                .user(user)
                .build();
        annonceRepository.save(annonce);
    //    annonceUser.setId(new AnnonceUserID(annonce.getId(), user.getId()));
    //    annonceUser.setAnnonce(annonce);
    //    annonceUser.setUser(user);
    //   annonceUserRepository.save(annonceUser);
    }
    public Boolean supprimerannonce(Long idannonce,User user){
         Annonce annonce=annonceRepository.findAnnoncebyuser(user.getId(),idannonce);
         if(annonce!=null) {
             annonceRepository.deleteById(idannonce);
         return true;
         }
         return false;
         }
    public Boolean modifierannonce(AnnonceRequest request,User user,Long idannonce){
        Annonce annonce=annonceRepository.findAnnoncebyuser(user.getId(),idannonce);
        if(annonce==null)
            return false;
        else{
            annonce.setTitre_annonce(request.getTitre_annonce());
            annonce.setDate_fin_annonce(request.getDate_fin_annonce());
            annonce.setDescription(request.getDescription());
            annonce.setTarif_depart(request.getTarif_depart());
            annonce.setTarif_final(request.getTarif_final());
            annonceRepository.save(annonce);
            return true;
        }
    }
}
