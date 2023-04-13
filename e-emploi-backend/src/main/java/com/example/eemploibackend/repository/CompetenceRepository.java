package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Competence;
import com.example.eemploibackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetenceRepository extends JpaRepository<Competence,Long> {
    @Query("Select c from Competence c where c.id=?1")
    Competence findCompetenceById(Long id);
    @Query("SELECT c from Competence c where c.user.id=?1")
    List<Competence> findAllByUserId(Long iduser);

    @Query("SELECT C from Competence C where C.user.username=?1")
    List<Competence> findAllByUsername(String username);
 }
