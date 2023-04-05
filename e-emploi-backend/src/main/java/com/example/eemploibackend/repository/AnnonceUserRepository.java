package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.AnnonceUser;
import com.example.eemploibackend.model.AnnonceUserID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnonceUserRepository extends JpaRepository<AnnonceUser, AnnonceUserID> {
}
