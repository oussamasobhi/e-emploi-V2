package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Categorie_2_Annonce;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class AnnonceRequest {
    private String titre_annonce;
    private String description;
    private double tarif_depart;
    private double tarif_final;
    private Date date_fin_annonce;
    private Long id_categorie2Annonce;
}
