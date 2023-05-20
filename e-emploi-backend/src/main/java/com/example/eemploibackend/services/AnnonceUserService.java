package com.example.eemploibackend.services;

import com.example.eemploibackend.exceptions.BadRequestException;
import com.example.eemploibackend.model.*;
import com.example.eemploibackend.payloads.FilesResponse;
import com.example.eemploibackend.payloads.PostuleAnnonceRequest;
import com.example.eemploibackend.repository.AnnonceRepository;
import com.example.eemploibackend.repository.AnnonceUserRepository;
import com.example.eemploibackend.repository.FileDBRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnonceUserService {
    private final AnnonceRepository annonceRepository;
    private final UserRepository userRepository;
    private final AnnonceUserRepository annonceUserRepository;
    private final FileStorageService fileStorageService;
    private final FileDBRepository fileDBRepository;
    public void ajouterannonceuser(PostuleAnnonceRequest request, Long iduser){
        Annonce annonce=annonceRepository.findById(request.getIdannonce())
                .orElseThrow(()-> new BadRequestException("annonce not found"));
        User user=userRepository.findById(iduser)
                .orElseThrow(()-> new BadRequestException("user not found"));
        AnnonceUser annonceUser= AnnonceUser.builder()
                .id(new AnnonceUserID(iduser, request.getIdannonce()))
                .annonce(annonce)
                .user(user)
                .statusReservation(StatusReservation.Standard)
                .build();
        annonceUserRepository.save(annonceUser);
    }
    public void accepterAnnonceUser(Long idannonce,Long iduser){
        AnnonceUser annonceUser=getAnnonceUser(idannonce, iduser);
        annonceUser.setStatusReservation(StatusReservation.Reservé);
    }

    public AnnonceUser getAnnonceUser(Long idannonce, Long iduser){
        return annonceUserRepository.findbyuserandannonce(idannonce, iduser);
    }
}
