package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Professionel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProRepository extends JpaRepository<Professionel,Long> {

}
