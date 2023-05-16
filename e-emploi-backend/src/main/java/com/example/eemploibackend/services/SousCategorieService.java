package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Categorie_1_Annonce;
import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.repository.Categorie_1_AnnonceRepository;
import com.example.eemploibackend.repository.Categorie_2_Annonce_Repository;
import com.example.eemploibackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SousCategorieService {
    private final Categorie_1_AnnonceRepository categorie1AnnonceRepository;
    private final CategoryRepository categoryRepository;
    public List<Categorie_1_Annonce> getallsouscategorie(Long idcategory){
         if(categoryRepository.existsById(idcategory))
        return categorie1AnnonceRepository.findallbycategoryid(idcategory);
      return null;
    }
    public List<Categorie_1_Annonce> getAll(){
        return categorie1AnnonceRepository.findAll();
    }
}
