package com.example.eemploibackend.payloads;

import lombok.*;

@Data
@NoArgsConstructor
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

}
