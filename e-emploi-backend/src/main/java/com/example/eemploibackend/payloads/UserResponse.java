package com.example.eemploibackend.payloads;

import lombok.Data;

import java.util.Date;

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
}
