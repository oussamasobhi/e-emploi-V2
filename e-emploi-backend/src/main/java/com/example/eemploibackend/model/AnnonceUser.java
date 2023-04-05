package com.example.eemploibackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "annonce_user")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnnonceUser {
    @EmbeddedId
    private  AnnonceUserID id;
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idannonce")
    private Annonce annonce;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("iduser")
    private User user;
    private double duree_propose_real;
    private double duree_valide_real;
    private double duree_real_final;
    private double tarif_nego;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        AnnonceUser that = (AnnonceUser) o;
        return Objects.equals(annonce, that.annonce) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, annonce);
    }
}
