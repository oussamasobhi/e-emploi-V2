package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.*;
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
    private FileDB photo_profil;
    private String description;
   private Adresse adresse;
   private StatusUser status;
   private double rate;
}
