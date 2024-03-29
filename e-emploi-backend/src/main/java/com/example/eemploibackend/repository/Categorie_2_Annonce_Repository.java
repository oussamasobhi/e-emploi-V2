package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Categorie_2_Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface Categorie_2_Annonce_Repository extends JpaRepository<Categorie_2_Annonce,Long> {
    @Query("SELECT c from Categorie_2_Annonce c where c.id=?1")
    Categorie_2_Annonce findCategorie_2_AnnonceById(Long id);
}
