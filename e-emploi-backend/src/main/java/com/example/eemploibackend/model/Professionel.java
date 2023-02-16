package com.example.eemploibackend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@Entity
@Table(name = "profesionel")
public class Professionel extends User{

    private String description;

    @Builder
    public Professionel(Long id, String name, String username, String email, String password, Boolean isTasker, Set<Role> roles, String description) {
        super(id, name, username, email, password, isTasker, roles);
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Professionel() {
    }

    public Professionel(String description) {
        this.description = description;
    }
}
