package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.model.User;
import lombok.Data;

import java.sql.Date;
import java.time.Instant;

@Data
public class AnnonceResponse {
    private Long id;
    private Instant createdAt;
    private String titre_annonce;
    private String description;
    private double tarif_depart;
    private double tarif_final;
    private Date date_fin_annonce;
    private String categorie2Annonce;
    private String categorieAnnonce;
    private UserResponse userResponse;
}
