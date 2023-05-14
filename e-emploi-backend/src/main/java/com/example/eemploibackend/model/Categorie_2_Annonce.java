package com.example.eemploibackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categorie_2_annonce")
public class Categorie_2_Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom_sous_categorie;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categorie_1", nullable = false)
    @JsonIgnore
    private Categorie_1_Annonce categorie_1_Annonce;
    @ManyToMany(mappedBy = "competences")
    List<User> users;
}
