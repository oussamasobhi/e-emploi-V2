package com.example.eemploibackend.payloads;

import lombok.Data;

@Data
public class SocieteRequest {
    private String nom_societe;
    private String num_tel;
    private String siteweb;
    private String num_patente;
    private Byte[] justif_image;
}
