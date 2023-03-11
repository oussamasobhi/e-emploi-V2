package com.example.eemploibackend.model;

import jakarta.persistence.*;
import org.apache.logging.log4j.CloseableThreadContext;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Offre_emploi")
public class OffreEmploi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_offre;
    private String titre;
    private String contenu;
    @CreatedDate
    private Date createdat;
    private String etat;
    @ManyToMany
    @JoinTable(
            name = "prestataire_offre",
            joinColumns = @JoinColumn(name = "offre_id"),
            inverseJoinColumns = @JoinColumn(name = "pro_id"))
    private List<Professionel> prestataires;
}
