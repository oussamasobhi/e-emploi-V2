package com.example.eemploibackend.utils;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.repository.AdresseRepository;
import com.example.eemploibackend.repository.AdresseSocietyRepository;
import com.example.eemploibackend.repository.UserRepository;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
class MapperUserSummaryTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdresseRepository adresseRepository;
    private User user;
    private Adresse ad;
    @BeforeEach
    void setUp() {
         user=new User();
        user.setUsername("azzaa");
         ad= Adresse.builder()
                .pays("aaa")
                .ville("aea")
                .user(user)
                .build();
    }

    @Test
    void mappeusertousersummary() {
        User user=new User();
        user.setUsername("azzaa");
        User usersaved=userRepository.save(user);
        Adresse ad= Adresse.builder()
                .pays("aaa")
                .ville("aea")
                .user(user)
                .build();
       Adresse adressesaved= adresseRepository.save(ad);
        assertThat(adressesaved).isNotNull();
        assertThat(usersaved).isNotNull();

        //   List<Adresse> adresseList=userRepository.findaddressesbyuserid(1L);
     //   Assertions.assertSame(adresseList.get(0).getPays(), "aaa");
    }
}