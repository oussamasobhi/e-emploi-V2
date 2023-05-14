package com.example.eemploibackend.controller;

import com.example.eemploibackend.model.CategorieAnnonce;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {
    private final CategoryService categoryService;


    @GetMapping("")
    public List<CategorieAnnonce> getallcategories(){
        return categoryService.getallcategories();
    }
    @PutMapping("/{id}/edit")
    public ResponseEntity<?> updatecategory(@RequestBody CategorieAnnonce categorie,
                                           @PathVariable(value="id") Long id){
        categoryService.modifiercategorie(categorie,id);
        return new ResponseEntity(new ApiResponse(true, "categorie modifié"),
                HttpStatus.ACCEPTED);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createcategory(@RequestBody CategorieAnnonce categorie){
        categoryService.ajoutecategorie(categorie);
        return new ResponseEntity(new ApiResponse(true, "categorie ajouté"),
                HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deletecategory(@PathVariable(value = "id") Long id){
        categoryService.supprimercategorie(id);
        return new ResponseEntity(new ApiResponse(true, "categorie supprimé"),
                HttpStatus.ACCEPTED);
    }
}
