package com.example.eemploibackend.controller;

import com.example.eemploibackend.model.CategorieAnnonce;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {
    private final CategoryService categoryService;

    //@PreAuthorize("hasAnyAuthority('ROLE_Pro','ROLE_ADMIN','ROLE_STANDARD','ROLE_Guest')")
    @GetMapping("")
    public List<CategorieAnnonce> getallcategories(){
        return categoryService.getallcategories();
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}/edit")
    public ResponseEntity<?> updatecategory(@RequestBody CategorieAnnonce categorie,
                                           @PathVariable(value="id") Long id){
        categoryService.modifiercategorie(categorie,id);
        return new ResponseEntity(new ApiResponse(true, "categorie modifié"),
                HttpStatus.ACCEPTED);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> createcategory(@RequestBody CategorieAnnonce categorie){
        categoryService.ajoutecategorie(categorie);
        return new ResponseEntity(new ApiResponse(true, "categorie ajouté"),
                HttpStatus.ACCEPTED);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deletecategory(@PathVariable(value = "id") Long id){
        categoryService.supprimercategorie(id);
        return new ResponseEntity(new ApiResponse(true, "categorie supprimé"),
                HttpStatus.ACCEPTED);
    }
}
