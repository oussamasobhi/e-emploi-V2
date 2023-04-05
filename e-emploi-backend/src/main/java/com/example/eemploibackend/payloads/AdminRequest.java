package com.example.eemploibackend.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminRequest {
    private String nom;
    private String prenom;
    private String username;
    private String email;
    private String password;
}
