package com.example.eemploibackend;

import com.example.eemploibackend.model.*;
import com.example.eemploibackend.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Order(1)
public class DatabaseInitializer implements ApplicationRunner {
    private final RoleRepository roleRepository;
    private final AdresseRepository adresseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final Categorie_2_Annonce_Repository categorie2AnnonceRepository;

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
        // categorie 1 : DOMICILE
        CategorieAnnonce domicile= CategorieAnnonce.builder()
                .nom_categorie("Domicile")
                .build();
        categoryRepository.save(domicile);
        Categorie_2_Annonce servicenettoyage= Categorie_2_Annonce.builder()
                .categorieAnnonce(domicile)
                .nom_sous_categorie("Service nettoyage")
                .duree_moy_realisation(4)
                .tarif_moy_categorie(300)
                .build();
        categorie2AnnonceRepository.save(servicenettoyage);
        Categorie_2_Annonce serviceartisans= Categorie_2_Annonce.builder()
                .categorieAnnonce(domicile)
                .nom_sous_categorie("Service artisans")
                .duree_moy_realisation(3)
                .tarif_moy_categorie(200)
                .build();
        categorie2AnnonceRepository.save(serviceartisans);
        //categorie: Emplois et services
        CategorieAnnonce emplois_comp= CategorieAnnonce.builder()
                .nom_categorie("Emplois et services")
                .build();
        categoryRepository.save(emplois_comp);
        Categorie_2_Annonce offresemploi= Categorie_2_Annonce.builder()
                .categorieAnnonce(emplois_comp)
                .nom_sous_categorie("offres emplois")
                .build();
        categorie2AnnonceRepository.save(offresemploi);
        Categorie_2_Annonce services= Categorie_2_Annonce.builder()
                .categorieAnnonce(emplois_comp)
                .nom_sous_categorie("services")
                .build();
        categorie2AnnonceRepository.save(services);
        //categorie 3 : PRODUITS
        CategorieAnnonce produit= CategorieAnnonce.builder()
                .nom_categorie("produits")
                .build();
        categoryRepository.save(produit);
    }
}
