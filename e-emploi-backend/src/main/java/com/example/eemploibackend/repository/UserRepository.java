package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsernameOrEmail(String username, String email);
    @Query("Select u.id from User u where u.username=?1")
    Long findIdByUsername(String username);
    Optional<User> findByUsername(String username);
    @Query("Select u from User u where u.id=?1")
    User findUserById(Long id);
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    @Query("SELECT U.image from User U where U.id=?1")
    FileDB getfilebyuserid(Long userid);

    @Query("SELECT U from User U where U.role.id=3")
    List<User> getallusersPRO();

}
