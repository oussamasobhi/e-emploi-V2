package com.example.eemploibackend.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
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
    @JsonIgnore
    private Annonce annonce;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("iduser")
    @JsonIgnore
    private User user;
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
