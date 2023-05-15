package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.CategorieAnnonce;
import com.example.eemploibackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategorieAnnonce,Long> {
    boolean existsById(Long idcategory);

    @Query("SELECT U.users from CategorieAnnonce U where U.id=?1")
    List<User> getusersbycategory(Long id);
}
