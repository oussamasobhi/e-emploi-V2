package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    @Query("SELECT R.rate from Review R where R.user.id=?1")
    List<Double> findratebyuser(Long iduser);
}
