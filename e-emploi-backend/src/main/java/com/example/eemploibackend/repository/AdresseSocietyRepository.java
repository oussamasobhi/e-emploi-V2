package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.Adresse_societe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdresseSocietyRepository extends JpaRepository<Adresse_societe,Long> {

}
