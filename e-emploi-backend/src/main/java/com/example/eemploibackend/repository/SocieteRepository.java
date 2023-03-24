package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Societe;
import com.example.eemploibackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocieteRepository extends JpaRepository<Societe,Long> {
   @Query("select u.societe from User u where u.id=?1")
    Societe findSocieteByUserId(Long userid);
}
