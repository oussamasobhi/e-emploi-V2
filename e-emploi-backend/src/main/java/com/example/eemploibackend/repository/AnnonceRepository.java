package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Annonce;
import com.example.eemploibackend.payloads.AnnonceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AnnonceRepository extends JpaRepository<Annonce,Long> {
    @Query("SELECT A from Annonce A where A.user.id=?1 and A.id=?2")
    Annonce findAnnoncebyuser(Long iduser,Long idannonce);
 //   @Query("SELECT A from Annonce A where A.tarif_depart<?2 and A.tarif_depart>?3 and (A.description LIKE %?1% OR A.titre_annonce LIKE %?1%)")
  //  Page<Annonce> findByTitreOrDescription(String search,double max_tarif_dep,double min_tarif_dep,Pageable pageable);
//    @Query("SELECT A from Annonce A where A.tarif_depart<?1 AND A.tarif_depart>?2")
//    Page<Annonce> findByTarifdepart(double max_tarif_dep,double min_tarif_dep,Pageable pageable);
    @Query("SELECT A from Annonce A where A.id=?1")
    Annonce findAnnonceById(Long idannonce);
    @Query("SELECT A from Annonce A where A.categorie2Annonce.id=?1 and A.adresse.ville=?2")
    Page<Annonce> getannonceByCategorie2(Long idcategorie,String ville,Pageable pageable);
    @Query("SELECT A from Annonce A where A.categorie1Annonce.id=?1 and A.adresse.ville=?2")
    Page<Annonce> getannonceByCategorie1(Long idcategorie,String ville,Pageable pageable);
    @Query("SELECT A from Annonce A where A.user.id=?1")
    List<Annonce> getAllannoncesByuserid(Long iduser);

    @Query("SELECT A FROM Annonce A WHERE A.id IN (SELECT A1.id.idannonce FROM AnnonceUser A1 WHERE A1.user.id=?1)")
    List<Annonce> getPostulationsByUserId(Long iduser);

}
