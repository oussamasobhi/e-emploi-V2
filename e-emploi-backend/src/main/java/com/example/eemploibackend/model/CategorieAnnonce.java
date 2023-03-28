package com.example.eemploibackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "categorie")
public class CategorieAnnonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom_categorie;
}
