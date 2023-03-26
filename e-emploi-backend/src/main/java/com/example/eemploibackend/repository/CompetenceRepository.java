package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Competence;
import com.example.eemploibackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetenceRepository extends JpaRepository<Competence,Long> {
    @Query("Select c from Competence c where c.id=?1")
    Competence findCompetenceById(Long id);
}
