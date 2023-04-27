package com.example.eemploibackend.services;

import com.example.eemploibackend.exceptions.BadRequestException;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
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
                .duree_propose_real(request.getDuree_prop_real())
                .tarif_nego(request.getTarif_nego())
                .statusAnnonce(StatusAnnonce.Demande_Envoyé)
                .build();
        annonceUserRepository.save(annonceUser);
    }
    public List<FilesResponse> recupererfiles(Long idannonce, Long iduser){
        List<FilesResponse> filesResponses=new ArrayList<>();

        AnnonceUser annonceUser=annonceUserRepository.findbyuserandannonce(idannonce,iduser);
        if(annonceUser==null)
            return null;
        else {
            List<FileDB> documents=annonceUserRepository.findfilesbyannonceuser(annonceUser.getId());

            for(FileDB f:documents){
                filesResponses.add(mapfiletofileresponse(f));
            }
        }
        return filesResponses;
    }
    public FilesResponse mapfiletofileresponse(FileDB file){
        FilesResponse filesResponse=FilesResponse.builder()
                .filename(file.getName())
                .filepath(file.getFilepath())
                .build();
        return filesResponse;
    }
    public Boolean upmoadimageAnnonceUser(Long idannonce, Long iduser, MultipartFile file) throws IOException {
        AnnonceUser annonceUser = annonceUserRepository.findbyuserandannonce(idannonce, iduser);
        if(annonceUser==null)
            return false;
        FileDB storedfile = fileStorageService.store(file);
        if (storedfile != null) {
            storedfile.setAnnonce_user(annonceUser);
            fileDBRepository.save(storedfile);
        }else {
            return false;
        }
        return true;
    }
    public List<FileDB> getallfiles(Long idannonce,Long iduser){
        AnnonceUserID annonceUserID=new AnnonceUserID(iduser,idannonce);
        List<FileDB> files=fileDBRepository.findfilesbyuserandannonce(idannonce,iduser);
        return files;
    }
}
