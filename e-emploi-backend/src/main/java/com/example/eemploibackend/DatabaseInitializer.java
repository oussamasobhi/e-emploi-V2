package com.example.eemploibackend;

import com.example.eemploibackend.model.*;
import com.example.eemploibackend.repository.AdresseRepository;
import com.example.eemploibackend.repository.RoleRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.management.relation.RoleStatus;
import java.util.Collections;

@Component
@AllArgsConstructor
@Order(1)
public class DatabaseInitializer implements ApplicationRunner {
    private final RoleRepository roleRepository;
    private final AdresseRepository adresseRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        Role roleadmin= Role.builder().name(RoleName.ROLE_ADMIN).build();
        Role rolestandard=Role.builder().name(RoleName.ROLE_STANDARD).build();
        Role rolecondidat=Role.builder().name(RoleName.ROLE_CONDIDAT).build();
        Role rolepro=Role.builder().name(RoleName.ROLE_Pro).build();
           roleRepository.save(roleadmin);
           roleRepository.save(rolestandard);
           roleRepository.save(rolecondidat);
           roleRepository.save(rolepro);
        User admin=new User();
                admin.setNom("sobhi");
                admin.setPrenom("oussama");
                admin.setUsername("osamasobhi");
                admin.setEmail("oussama@admin.com");
                admin.setPassword(encoder.encode("admin"));
        admin.setRole(roleadmin);
        userRepository.save(admin);
        Adresse ad=new Adresse();
        ad.setUser(admin);
        ad.setPays("maroc");
        ad.setVille("agadir");
        adresseRepository.save(ad);
        admin.setAdresses(Collections.singleton(ad));
    }
}
