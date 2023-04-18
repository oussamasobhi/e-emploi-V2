package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB,Long> {
    Optional<FileDB> findByName(String fileName);

    @Query("SELECT U from User U where U.image.name=?1")
    User  findbyfilename(String filaname);
}
