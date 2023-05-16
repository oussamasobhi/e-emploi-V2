package com.example.eemploibackend.model;

import com.example.eemploibackend.model.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Annonce extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String infos_complementaire;
    private Date date;
    private String duree;
    @OneToOne
    private Adresse adresse;
    @OneToMany(mappedBy = "annonce",cascade = CascadeType.ALL)
    private List<FileDB> images;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_Categorie_2", nullable = false)
    @JsonIgnore
    private Categorie_2_Annonce categorie2Annonce;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_Categorie_1", nullable = false)
    @JsonIgnore
    private Categorie_1_Annonce categorie1Annonce;

    @OneToMany(
            mappedBy = "annonce",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<AnnonceUser> annonceUsers;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    @JsonIgnore
    private User user;
}
