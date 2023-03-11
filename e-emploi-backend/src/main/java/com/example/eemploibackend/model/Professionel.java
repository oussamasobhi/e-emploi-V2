package com.example.eemploibackend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "professionel")
public class Professionel extends User{
  private String num_tel;
  private String CIN;
  private Byte[] photo_profil;
  private Date date_naissance;

@ManyToMany(mappedBy = "prestataires")
private List<OffreEmploi> offres;

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews;

    public Professionel(Long id, String prenom, String nom, String username, String email, String password, RoleName roleName, String num_tel, String CIN, Byte[] photo_profil, Date date_naissance) {
        super(id, nom, prenom, username, email, password, roleName);
        this.num_tel = num_tel;
        this.CIN = CIN;

        this.photo_profil = photo_profil;
        this.date_naissance = date_naissance;
    }

}
