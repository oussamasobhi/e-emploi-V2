package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Data
public class AnnonceResponse {
    private String infos_complementaire;
    private Date date;
    private String duree;
    private Adresse adresse;
    private List<FileDB> images;
    private Categorie_2_Annonce categorie2Annonce;
    private Categorie_1_Annonce categorie1Annonce;
    private List<AnnonceUser> annonceUsers;
    private UserResponse userResponse;
    private StatusAnnonce statusAnnonce;
}
