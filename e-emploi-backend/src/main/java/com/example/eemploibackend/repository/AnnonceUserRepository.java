package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.AnnonceUser;
import com.example.eemploibackend.model.AnnonceUserID;
import com.example.eemploibackend.model.FileDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnonceUserRepository extends JpaRepository<AnnonceUser, AnnonceUserID> {
    @Query("SELECT A from AnnonceUser A where A.user.id=?2 and A.annonce.id=?1")
    AnnonceUser findbyuserandannonce(Long idannonce,Long iduser);
    @Query("SELECT A.documents from AnnonceUser A where A.id=?1")
    List<FileDB> findfilesbyannonceuser(AnnonceUserID annonceuserid);
}
