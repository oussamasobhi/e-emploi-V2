package com.example.eemploibackend.auth.tasker;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pro_RegisterRequest {
    private String name;
    private String username;
    private String email;
    private String password;
    private String description;
}
