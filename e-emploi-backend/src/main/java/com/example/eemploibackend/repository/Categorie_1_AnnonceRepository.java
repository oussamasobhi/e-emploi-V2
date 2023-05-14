package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Categorie_1_Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Categorie_1_AnnonceRepository extends JpaRepository<Categorie_1_Annonce,Long> {
}
