package com.example.eemploibackend.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "files")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FileDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;
    private String filepath;
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumns({
            @JoinColumn(
                    name = "user_id",
                    referencedColumnName = "user_id"),
            @JoinColumn(
                    name = "annonce_id",
                    referencedColumnName = "annonce_id")
    })
    @JsonIgnore
    private AnnonceUser annonce_user;

    @ManyToOne(fetch = FetchType.LAZY,optional = true)
    @JoinColumn(name ="id_annonce_post", nullable = true)
    @JsonIgnore
    private Annonce annonce;

    @ManyToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name = "idcompetence",nullable = true)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private Competence competence;
}
