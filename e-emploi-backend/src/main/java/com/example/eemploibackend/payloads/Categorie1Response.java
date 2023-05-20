package com.example.eemploibackend.payloads;

import lombok.Data;

import java.util.List;
@Data
public class Categorie1Response {
    private Long id;
    private String nom_sous_categorie;
    private List<Long> users;
}
