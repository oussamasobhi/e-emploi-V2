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
    private Long id;
    private String infos_complementaire;
    private Date date;
    private String duree;
    private Adresse adresse;
    private List<FileDB> images;
    private Long categorie2Annonce;
    private Long categorie1Annonce;
    private List<AnnonceUser> annonceUsers;
    private UserResponse userResponse;
    private StatusAnnonce statusAnnonce;
}
