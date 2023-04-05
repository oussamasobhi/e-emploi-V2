package com.example.eemploibackend.services;

import com.example.eemploibackend.model.CategorieAnnonce;
import com.example.eemploibackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public void ajoutecategorie(CategorieAnnonce categorieAnnonce){
        categoryRepository.save(categorieAnnonce);
    }
    public void modifiercategorie(CategorieAnnonce categorieAnnonce,Long idcategorie){
        CategorieAnnonce categorie=categoryRepository.findById(idcategorie).orElseThrow();
        categorie.setNom_categorie(categorieAnnonce.getNom_categorie());
        categoryRepository.save(categorie);
    }
    public void supprimercategorie(Long idcategorie){
        categoryRepository.deleteById(idcategorie);
    }
    public List<CategorieAnnonce> getallcategories(){
        return categoryRepository.findAll();
    }
}
