package com.example.eemploibackend.controller;

import com.example.eemploibackend.exceptions.AppException;
import com.example.eemploibackend.model.Categorie_1_Annonce;
import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.services.SousCategorieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/category/souscategory")
public class SousCategorieController {
    private final SousCategorieService service;
    @GetMapping("/{id}")
    public List<Categorie_1_Annonce> getsouscategories(@PathVariable(value = "id")Long id){
            return service.getallsouscategorie(id);
    }
    @GetMapping
    public List<Categorie_1_Annonce> getSousCategories(){
        return service.getAll();
    }
    @GetMapping("/this/{id}")
    public ResponseEntity<Categorie_1_Annonce> getSousCategory(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.getSousCAtegoryById(id)) ;
    }
}
