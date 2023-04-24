package com.example.eemploibackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@Builder
@Entity
@Table(name = "competence")
@AllArgsConstructor
@NoArgsConstructor
public class Competence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String niveauscolaire;
    private String duree_formation;
    private Date date_obtention;
    private String duree_exp;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "competence",cascade = CascadeType.ALL)
    private List<FileDB> documents;
}
