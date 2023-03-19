package com.example.eemploibackend.payloads;

import lombok.Data;

@Data
public class AddressRequest {
    private String pays;
    private String ville;
    private String lib_addre;
}
