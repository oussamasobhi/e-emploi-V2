package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Categorie_2_Annonce;
import lombok.Data;

import java.sql.Date;
@Data
public class AnnonceResponse {
    private String titre_annonce;
    private String description;
    private double tarif_depart;
    private double tarif_final;
    private Date date_fin_annonce;
    private String categorie2Annonce;
    private String categorieAnnonce;
}
