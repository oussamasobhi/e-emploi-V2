package com.example.eemploibackend.payloads;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchRequest {
private Long id_categorie_1_annonce;
private Long id_categorie_2_annonce;
private String Ville;
}
