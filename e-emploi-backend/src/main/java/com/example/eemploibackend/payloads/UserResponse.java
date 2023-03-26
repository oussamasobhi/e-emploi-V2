package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.Competence;
import com.example.eemploibackend.model.Societe;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UserResponse {
    private Long id;
    private String nom;
    private String prenom;
    private String num_tel;
    private String username;
    private String email;
    private String CIN;
    private String role;
    private Date date_naissance;
    private Byte[] photo_profil;
    private List<Adresse> adresses;
    private Societe societe;
    private List<Competence> competences;
}
