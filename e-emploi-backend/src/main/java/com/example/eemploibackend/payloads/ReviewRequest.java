package com.example.eemploibackend.payloads;

import lombok.Data;
import lombok.RequiredArgsConstructor;
@Data
@RequiredArgsConstructor
public class ReviewRequest {
    Long id;
    String avis;
    double rate;
}
