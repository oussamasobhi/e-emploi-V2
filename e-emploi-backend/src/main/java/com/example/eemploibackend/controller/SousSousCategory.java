package com.example.eemploibackend.controller;

import com.example.eemploibackend.model.Categorie_1_Annonce;
import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.services.SoussousCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/category/soussouscategory")
public class SousSousCategory {
    private final SoussousCategory soussousCategory;
    @GetMapping("/{id}")
    public List<Categorie_2_Annonce> getsouscategory(@PathVariable(name = "id")Long id){
        return soussousCategory.getsouscategory(id);
    }
}
