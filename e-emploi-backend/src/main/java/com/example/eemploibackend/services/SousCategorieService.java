package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.repository.Categorie_2_Annonce_Repository;
import com.example.eemploibackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SousCategorieService {
    private final Categorie_2_Annonce_Repository categorie2AnnonceRepository;
    private final CategoryRepository categoryRepository;
    public List<Categorie_2_Annonce> getallsouscategorie(Long idcategory){
         if(categoryRepository.existsById(idcategory))
        return categorie2AnnonceRepository.findAllByCategorieAnnonceId(idcategory);
      return null;
    }
}
