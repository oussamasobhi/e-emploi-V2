package com.example.eemploibackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "clients")
public class Client extends User{
    @Builder
    public Client(Long id, String name, String username, String email, String password, Boolean isTasker, Set<Role> roles) {
        super(id, name, username, email, password, isTasker, roles);
    }
}
