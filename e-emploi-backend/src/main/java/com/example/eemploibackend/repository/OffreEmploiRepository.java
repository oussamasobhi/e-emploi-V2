package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.OffreEmploi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OffreEmploiRepository extends JpaRepository<OffreEmploi,Long> {
}
