package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.CategorieAnnonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategorieAnnonce,Long> {

}
