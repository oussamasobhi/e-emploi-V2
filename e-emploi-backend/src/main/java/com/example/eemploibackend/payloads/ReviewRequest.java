package com.example.eemploibackend.payloads;

import lombok.Data;
import lombok.RequiredArgsConstructor;
@Data
@RequiredArgsConstructor
public class ReviewRequest {
    String avis;
    double rate;
    Long iduser;
}
