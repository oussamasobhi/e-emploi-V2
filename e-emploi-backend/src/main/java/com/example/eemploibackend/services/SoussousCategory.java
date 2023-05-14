package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.repository.Categorie_1_AnnonceRepository;
import com.example.eemploibackend.repository.Categorie_2_Annonce_Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SoussousCategory {
    private final Categorie_2_Annonce_Repository categorie2AnnonceRepository;
    private final Categorie_1_AnnonceRepository categorie1AnnonceRepository;
    public List<Categorie_2_Annonce> getsouscategory(Long idsouscategory){
        if(categorie1AnnonceRepository.existsById(idsouscategory)){
            return categorie2AnnonceRepository.findAllBySousCategorieId(idsouscategory);
        }
        return null;
    }
}
