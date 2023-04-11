package com.example.eemploibackend.payloads;

import lombok.Data;

import java.sql.Date;

@Data
public class PostuleAnnonceRequest {
     private Long idannonce;
     private double duree_prop_real;
     private double tarif_nego;
}
