package com.example.eemploibackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categorie_3_annonce")
public class Categorie_3_Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom_sous_categorie;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categorie_2", nullable = false)
    @JsonIgnore
    private Categorie_2_Annonce categorie2Annonce;
}
