package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdresseRepository extends JpaRepository<Adresse,Long> {
}
