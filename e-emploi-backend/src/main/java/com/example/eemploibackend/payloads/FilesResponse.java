package com.example.eemploibackend.payloads;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FilesResponse {
    private String filename;
    private String filepath;
}
