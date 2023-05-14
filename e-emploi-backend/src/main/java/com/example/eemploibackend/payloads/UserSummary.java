package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.FileDB;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class UserSummary {
    private Long id;
    private String prenom;
    private String nom;
    private String username;
    private String email;
    private String password;
    private String num_tel;
    private String CIN;
    private String Role;
    private FileDB photo_profil;
    private Date date_naissance;
    List<Adresse> adresses;
}
