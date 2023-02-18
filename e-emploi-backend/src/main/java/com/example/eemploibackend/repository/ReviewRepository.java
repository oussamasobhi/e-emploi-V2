package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review,Long> {
}
