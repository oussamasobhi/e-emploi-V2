package com.example.eemploibackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "societe")
public class Societe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom_societe;
    private String num_tel;
    private String siteweb;
    private String num_patente;
    private Byte[] justif_image;
    @OneToMany(mappedBy = "societe",cascade = CascadeType.ALL)
    private List<Adresse_societe> adresses_societes;
}
