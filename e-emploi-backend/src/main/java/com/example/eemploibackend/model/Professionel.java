package com.example.eemploibackend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
@Entity
@Table(name = "profesionel")
public class Professionel extends User{

    private String description;

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews;
    @Builder
    public Professionel(Long id, String name, String username, String email, String password, Boolean isTasker, Set<Role> roles, String description) {
        super(id, name, username, email, password, isTasker, roles);
        this.description = description;
        this.reviews=new HashSet<>();
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
