package com.example.eemploibackend.controller;

import com.example.eemploibackend.exceptions.AppException;
import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.services.SousCategorieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SousCategorieController {
    private final SousCategorieService service;
    @GetMapping("/categorie/{id}/all")
    public List<Categorie_2_Annonce> getsouscategories(@PathVariable(value = "id")Long id){
        if(service.getallsouscategorie(id).equals(null)){
            throw new AppException("id n'existe pas");
        }
        else
            return service.getallsouscategorie(id);
    }
}
