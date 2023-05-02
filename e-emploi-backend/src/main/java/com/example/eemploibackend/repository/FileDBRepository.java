package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.AnnonceUserID;
import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB,Long> {
    Optional<FileDB> findByName(String fileName);

    @Query("SELECT U from User U where U.image.name=?1")
    User  findbyfilename(String filaname);
    @Query("SELECT F from FileDB F where F.competence.id=?1")
    List<FileDB> findidcompetence(Long idcompetence);
    @Query("SELECT A from FileDB A where  A.annonce_user.annonce.id=?1 and A.annonce_user.user.id=?2")
    List<FileDB> findfilesbyuserandannonce(Long idannonce,Long iduser);
    @Query("SELECT A from FileDB A where A.annonce.id=?1")
    List<FileDB> findfilesbyannonce(Long idannonce);
}
