package com.example.eemploibackend.services;

import com.example.eemploibackend.exceptions.BadRequestException;
import com.example.eemploibackend.model.*;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.*;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnonceService {
    private final FileDBRepository fileDBRepository;
    private final AnnonceRepository annonceRepository;
    private final FileStorageService fileStorageService;
    private final Categorie_2_Annonce_Repository categorie2AnnonceRepository;
    private final AdresseRepository adresseRepository;
    private final Categorie_1_AnnonceRepository categorie1AnnonceRepository;
    public Annonce getannoncebyid(Long id){
        return annonceRepository.findById(id).orElseThrow();
    }
    public List<AnnonceResponse> getAllAnnonce(){
        List<Annonce> annonces=annonceRepository.findAll();
        List<AnnonceResponse> annonceResponses=new ArrayList<>();
        for(Annonce a:annonces){
            annonceResponses.add(ModelMapper.mapannonceToAnnonceResponse(a));
        }
        return annonceResponses;
    }
    public void ajouterannonce(User user, AnnonceRequest request){
        Categorie_2_Annonce categorie2Annonce=categorie2AnnonceRepository.findCategorie_2_AnnonceById(request.getId_categorie2Annonce());
        Categorie_1_Annonce categorie1Annonce=categorie1AnnonceRepository.findCategorie_1_AnnonceById(request.getId_categorie1Annonce());

        Adresse adresse= Adresse.builder()
                .ville(request.getVille())
                .quartier(request.getQuartier())
                .suplementaire(request.getSupplement())
                .build();
        adresseRepository.save(adresse);
        Annonce annonce= Annonce.builder()
                .categorie2Annonce(categorie2Annonce)
                .categorie1Annonce(categorie1Annonce)
                .duree(request.getDuree())
                .date(request.getDate())
                .infos_complementaire(request.getInfos_complementaire())
                .adresse(adresse)
                .images(request.getImages())
                .statusAnnonce(StatusAnnonce.EnCours)
                .user(user)
                .build();
        annonceRepository.save(annonce);
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
            Adresse adresse= Adresse.builder()
                    .ville(request.getVille())
                    .quartier(request.getQuartier())
                    .suplementaire(request.getSupplement())
                    .build();
            adresseRepository.save(adresse);
                    annonce.setDuree(request.getDuree());
                    annonce.setDate(request.getDate());
                    annonce.setInfos_complementaire(request.getInfos_complementaire());
                    annonce.setAdresse(adresse);
                    annonce.setImages(request.getImages());
            annonceRepository.save(annonce);
            return true;
        }
    }
    public PagedResponse<AnnonceResponse> getaaonnoncesparcategorie(Long idcategory,int page,int size,String search,
                                                                    double max_tarif_dep,double min_tarif_dep){
        validatePageNumberAndSize(page, size);
        // retrieve all annonces
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
       Page<Annonce> annonces=null;
 //       if(search.equals("")) {
 //           annonces = annonceRepository.findAll(pageable);
//        }
 //       else {
       //     annonces=annonceRepository.findByTitreOrDescription(search,max_tarif_dep,min_tarif_dep,pageable);
 //        }
        List<Annonce> result = annonces.getContent()
                .stream()
                .filter(i -> i.getCategorie2Annonce().getId().equals(idcategory))
                .collect(Collectors.toList());
        Page<Annonce> annoncePage = new PageImpl<Annonce>(result);
        List<AnnonceResponse> allannonces = annoncePage.map((annonce) -> {
                    return ModelMapper.mapannonceToAnnonceResponse(annonce);
                })
                .getContent();
        return new PagedResponse<>(allannonces, annoncePage.getNumber(),
                annoncePage.getSize(), annoncePage.getTotalElements(), annoncePage.getTotalPages(), annoncePage.isLast());
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > 50) {
            throw new BadRequestException("Page size must not be greater than " + 50);
        }
    }

    // images
    public Boolean uploadimageAnnonce(Long idannonce, MultipartFile file) throws IOException {
        Annonce annonce=annonceRepository.findAnnonceById(idannonce);
        if(annonce==null)
            return false;
        FileDB storedfile = fileStorageService.store(file);
        if (storedfile != null) {
            storedfile.setAnnonce(annonce);
            fileDBRepository.save(storedfile);
        }else {
            return false;
        }
        return true;
    }
    public List<FileDB> getallfiles(Long idannonce){
        List<FileDB> files=fileDBRepository.findfilesbyannonce(idannonce);
        return files;
    }
    public Boolean deletefile(Long idfile){
        FileDB fileDB=fileDBRepository.findById(idfile).orElseThrow();
        if(fileDB==null)
            return false;
        fileDBRepository.deleteById(idfile);
        File file=new File(fileDB.getFilepath());
        file.delete();
        return true;
    }

    public List<AnnonceResponse> getDemandespariduser(Long iduser){
        List<Annonce> annonces=annonceRepository.getAllannoncesByuserid(iduser);
        List<AnnonceResponse> annonceResponses=new ArrayList<>();
        for(Annonce a:annonces){
            annonceResponses.add(ModelMapper.mapannonceToAnnonceResponse(a));
        }
        return annonceResponses;
    }
    public void clotureAnnonce(Long idannonce){
        Annonce annonce=annonceRepository.findAnnonceById(idannonce);
        annonce.setStatusAnnonce(StatusAnnonce.Terminé);
        annonceRepository.save(annonce);
    }
    public List<AnnonceResponse> getPostulationsByUserId(Long iduser){
        List<Annonce> annonces=annonceRepository.getPostulationsByUserId(iduser);
        List<AnnonceResponse> annonceResponses=new ArrayList<>();
        for(Annonce a:annonces){
            annonceResponses.add(ModelMapper.mapannonceToAnnonceResponse(a));
        }
        return annonceResponses;
    }
    public void terminerAnnonce(Long id){
        Annonce annonce = annonceRepository.findById(id).get();
        annonce.setStatusAnnonce(StatusAnnonce.Terminé);
        annonceRepository.save(annonce);
    }
}
