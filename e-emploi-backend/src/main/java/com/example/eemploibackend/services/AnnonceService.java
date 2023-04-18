package com.example.eemploibackend.services;

import com.example.eemploibackend.exceptions.BadRequestException;
import com.example.eemploibackend.model.*;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.AnnonceRepository;
import com.example.eemploibackend.repository.AnnonceUserRepository;
import com.example.eemploibackend.repository.Categorie_2_Annonce_Repository;
import com.example.eemploibackend.repository.UserRepository;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnonceService {
    private final AnnonceUserRepository annonceUserRepository;
    private final AnnonceRepository annonceRepository;
    private final Categorie_2_Annonce_Repository categorie2AnnonceRepository;
    private final UserRepository userRepository;
    public Annonce getannoncebyid(Long id){
        return annonceRepository.findById(id).orElseThrow();
    }
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
            annonces=annonceRepository.findByTitreOrDescription(search,max_tarif_dep,min_tarif_dep,pageable);
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
}
