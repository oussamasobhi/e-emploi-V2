package com.example.eemploibackend.model;

import com.example.eemploibackend.model.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
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
    private String titre_annonce;
    private String description;
    private double tarif_depart;
    private double tarif_final;
    private double duree_propose_real;
    private Date date_fin_annonce;
    @OneToMany(mappedBy = "annonce",cascade = CascadeType.ALL)
    private List<Review> reviews;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_Categorie_2", nullable = false)
    @JsonIgnore
    private Categorie_2_Annonce categorie2Annonce;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "annonce_user",
            joinColumns = { @JoinColumn(name = "annonce_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") })
    private List<User> condidats;
}
