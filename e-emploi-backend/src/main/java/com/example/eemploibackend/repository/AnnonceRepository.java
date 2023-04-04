package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Annonce;
import com.example.eemploibackend.payloads.AnnonceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface AnnonceRepository extends JpaRepository<Annonce,Long> {
    @Query("SELECT A from Annonce A where A.user.id=?1 and A.id=?2")
    Annonce findAnnoncebyuser(Long iduser,Long idannonce);
}
