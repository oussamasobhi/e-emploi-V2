package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.CategorieAnnonce;
import com.example.eemploibackend.model.Categorie_1_Annonce;
import com.example.eemploibackend.model.Categorie_2_Annonce;
import com.example.eemploibackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Categorie_1_AnnonceRepository extends JpaRepository<Categorie_1_Annonce,Long> {
    @Query("SELECT C from Categorie_1_Annonce C where C.categorieAnnonce.id=?1")
    List<Categorie_1_Annonce> findallbycategoryid(Long idcategory);
    @Query("SELECT c from Categorie_1_Annonce c where c.id=?1")
    Categorie_1_Annonce findCategorie_1_AnnonceById(Long id);

    @Query("SELECT C.users from Categorie_1_Annonce C where C.categorieAnnonce.id=?1")
    List<User> getusersBysousCategory(Long id);

}
