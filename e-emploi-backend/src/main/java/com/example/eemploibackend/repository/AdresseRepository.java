package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdresseRepository extends JpaRepository<Adresse,Long> {
    @Query("SELECT A from Adresse A where A.id=?1")
    Adresse findAdresseById(Long id);
}
