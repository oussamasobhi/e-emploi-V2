package com.example.eemploibackend.payloads;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String oldpassword;
    private String newpassword;
}
