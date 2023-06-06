package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.model.FileDB;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.File;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class AnnonceRequest {
    private String infos_complementaire;
    private Date date;
    private String duree;
    private String ville;
    private String quartier;
    private String supplement;
    private Long id_categorie2Annonce;
    private Long id_categorie1Annonce;
    private List<FileDB> images;
}
