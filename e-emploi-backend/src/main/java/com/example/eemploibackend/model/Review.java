package com.example.eemploibackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "reviews")

// service de messagerie et ajout des documents

public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double rate;
    private String avis;
    // the person concerned with th review ( who post an announce)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    private User user;
    // the person who make a review
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_reviewer")
    private User reviewer;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "id_annonce", nullable = false)
//    @JsonIgnore
//    private Annonce annonce;
}
