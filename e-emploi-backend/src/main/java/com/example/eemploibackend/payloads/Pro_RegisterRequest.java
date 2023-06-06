package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.Categorie_1_Annonce;
import com.example.eemploibackend.model.FileDB;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pro_RegisterRequest {
    private String nom;
    private String prenom;
    private String username;
    private Adresse adresse;
    private String email;
    private String num_tel;
    private String CIN;
    private Date date_naissance;
    private List<Categorie_1_Annonce> competences;
    private FileDB image;
}
