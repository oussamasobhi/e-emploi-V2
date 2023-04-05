package com.example.eemploibackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnnonceUserID implements Serializable {
    @Column(name = "user_id")
    private Long iduser;
    @Column(name = "annonce_id")
    private Long idannonce;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        AnnonceUserID that = (AnnonceUserID) o;
        return Objects.equals(iduser, that.iduser) &&
                Objects.equals(idannonce, that.idannonce);
    }

    @Override
    public int hashCode() {
        return Objects.hash(iduser, idannonce);
    }
}
