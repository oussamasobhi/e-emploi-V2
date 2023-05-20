package com.example.eemploibackend.auth;

import com.example.eemploibackend.model.CategorieAnnonce;
import com.example.eemploibackend.model.Categorie_1_Annonce;
import com.example.eemploibackend.model.Categorie_2_Annonce;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String nom;
    private String CIN;
    private String prenom;
    private String username;
    private String email;
    private String password;
    private List<Categorie_1_Annonce> competences;
    private String num_tel;
    private Boolean isPRO;
 }
