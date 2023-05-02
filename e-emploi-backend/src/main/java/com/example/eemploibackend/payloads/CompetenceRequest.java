package com.example.eemploibackend.payloads;

import lombok.Data;

import java.sql.Date;

@Data
public class CompetenceRequest {
    private String titre;
    private String niveauscolaire;
    private String duree_formation;
    private Date date_obtention;
    private String duree_exp;
    private String description;
}
