package com.example.eemploibackend.services;

import com.example.eemploibackend.exceptions.BadRequestException;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Annonce;
import com.example.eemploibackend.model.AnnonceUser;
import com.example.eemploibackend.model.AnnonceUserID;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.PostuleAnnonceRequest;
import com.example.eemploibackend.repository.AnnonceRepository;
import com.example.eemploibackend.repository.AnnonceUserRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnnonceUserService {
    private final AnnonceRepository annonceRepository;
    private final UserRepository userRepository;
    private final AnnonceUserRepository annonceUserRepository;
    public void ajouterannonceuser(PostuleAnnonceRequest request, Long iduser){
        Annonce annonce=annonceRepository.findById(request.getIdannonce())
                .orElseThrow(()-> new BadRequestException("annonce not found"));
        User user=userRepository.findById(iduser)
                .orElseThrow(()-> new BadRequestException("user not found"));
        AnnonceUser annonceUser= AnnonceUser.builder()
                .id(new AnnonceUserID(iduser, request.getIdannonce()))
                .annonce(annonce)
                .user(user)
                .duree_propose_real(request.getDuree_prop_real())
                .tarif_nego(request.getTarif_nego())
                .build();
        annonceUserRepository.save(annonceUser);
    }
}
