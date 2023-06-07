package com.example.eemploibackend;

import com.example.eemploibackend.model.*;
import com.example.eemploibackend.payloads.AnnonceRequest;
import com.example.eemploibackend.repository.*;
import com.example.eemploibackend.services.AnnonceService;
import jdk.jfr.Category;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@AllArgsConstructor
@Order(1)
public class DatabaseInitializer implements ApplicationRunner {
    private final RoleRepository roleRepository;
    private final AnnonceService annonceService;
    private final UserRepository userRepository;
    private final AdresseRepository adresseRepository;
    private final CategoryRepository categoryRepository;
    private final Categorie_2_Annonce_Repository categorie2AnnonceRepository;
    private final Categorie_1_AnnonceRepository categorie1AnnonceRepository;
    private final BCryptPasswordEncoder encoder;
    private final AnnonceRepository annonceRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Role roleadmin = Role.builder().name(RoleName.ROLE_ADMIN).build();
        Role rolestandard = Role.builder().name(RoleName.ROLE_STANDARD).build();
        Role rolepro = Role.builder().name(RoleName.ROLE_Pro).build();
        roleRepository.save(roleadmin);
        roleRepository.save(rolestandard);
        roleRepository.save(rolepro);
        User admin = new User();
        admin.setNom("Sobhi");
        admin.setPrenom("Oussama");
        admin.setUsername("osamasobhi");
        admin.setEmail("oussama@admin.com");
        admin.setNum_tel("+212 615 785531");
        admin.setPassword(encoder.encode("admin"));
        admin.setStatusUser(StatusUser.Actif);
        admin.setRole(roleadmin);
        userRepository.save(admin);

        CategorieAnnonce cat1 = CategorieAnnonce.builder()
                .nom_categorie("Bricolage")
                .build();
        categoryRepository.save(cat1);
        CategorieAnnonce cat2 = CategorieAnnonce.builder()
                .nom_categorie("Animaux")
                .build();
        categoryRepository.save(cat2);
        CategorieAnnonce cat3 = CategorieAnnonce.builder()
                .nom_categorie("Jardinage")
                .build();
        categoryRepository.save(cat3);
        CategorieAnnonce cat4 = CategorieAnnonce.builder()
                .nom_categorie("Informatique")
                .build();
        categoryRepository.save(cat4);
        CategorieAnnonce cat5 = CategorieAnnonce.builder()
                .nom_categorie("Déménagement")
                .build();
        categoryRepository.save(cat5);
        CategorieAnnonce cat6 = CategorieAnnonce.builder()
                .nom_categorie("Aide à domicile")
                .build();
        categoryRepository.save(cat6);
        CategorieAnnonce cat7 = CategorieAnnonce.builder()
                .nom_categorie("Ménage")
                .build();
        categoryRepository.save(cat7);
        // SOUS categorie 1
        Categorie_1_Annonce souscat1 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat1)
                .nom_sous_categorie("Ameublement")
                .build();
        categorie1AnnonceRepository.save(souscat1);
        Categorie_1_Annonce souscat2 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat1)
                .nom_sous_categorie("Pose et fixation")
                .build();
        categorie1AnnonceRepository.save(souscat2);
        Categorie_1_Annonce souscat3 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat1)
                .nom_sous_categorie("Plomberie")
                .build();
        categorie1AnnonceRepository.save(souscat3);
        Categorie_1_Annonce souscat4 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat1)
                .nom_sous_categorie("Electricité")
                .build();
        categorie1AnnonceRepository.save(souscat4);
        // Animaux
        Categorie_1_Annonce sous2cat1 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat2)
                .nom_sous_categorie("Garde de chien")
                .build();
        categorie1AnnonceRepository.save(sous2cat1);
        Categorie_1_Annonce sous2cat2 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat2)
                .nom_sous_categorie("Garde de chat")
                .build();
        categorie1AnnonceRepository.save(sous2cat2);
        Categorie_1_Annonce sous2cat3 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat2)
                .nom_sous_categorie("Faire promener son chien")
                .build();
        categorie1AnnonceRepository.save(sous2cat3);
        // jardinage
        Categorie_1_Annonce sous3cat1 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat3)
                .nom_sous_categorie("Tendre la pelouse")
                .build();
        categorie1AnnonceRepository.save(sous3cat1);
        Categorie_1_Annonce sous3cat2 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat3)
                .nom_sous_categorie("Taille de haie")
                .build();
        categorie1AnnonceRepository.save(sous3cat2);
        Categorie_1_Annonce sous3cat3 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat3)
                .nom_sous_categorie("Désherbage")
                .build();
        categorie1AnnonceRepository.save(sous3cat3);
        Categorie_1_Annonce sous3cat4 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat3)
                .nom_sous_categorie("Entretien de gazon")
                .build();
        categorie1AnnonceRepository.save(sous3cat4);
        Categorie_1_Annonce sous3cat5 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat3)
                .nom_sous_categorie("Nettoyage de terrasse")
                .build();
        categorie1AnnonceRepository.save(sous3cat5);
        // informatique
        Categorie_1_Annonce sous4cat1 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat4)
                .nom_sous_categorie("Nettoyer mon ordinateur")
                .build();
        categorie1AnnonceRepository.save(sous4cat1);
        Categorie_1_Annonce sous4cat2 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat4)
                .nom_sous_categorie("Cours informatique")
                .build();
        categorie1AnnonceRepository.save(sous4cat2);
        Categorie_1_Annonce sous4cat3 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat4)
                .nom_sous_categorie("installer une box WIFI")
                .build();
        categorie1AnnonceRepository.save(sous4cat3);
        // demenagement
        Categorie_1_Annonce sous5cat1 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat5)
                .nom_sous_categorie("Déménagement tout compris")
                .build();
        categorie1AnnonceRepository.save(sous5cat1);
        Categorie_1_Annonce sous5cat2 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat5)
                .nom_sous_categorie("Louer un camion avec chauffeur")
                .build();
        categorie1AnnonceRepository.save(sous5cat2);
        Categorie_1_Annonce sous5cat3 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat5)
                .nom_sous_categorie("Déplacer un meuble")
                .build();
        categorie1AnnonceRepository.save(sous5cat3);
        Categorie_1_Annonce sous5cat4 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat5)
                .nom_sous_categorie("Débarasser des encombrants")
                .build();
        categorie1AnnonceRepository.save(sous5cat4);
        // Aide a domicile
        Categorie_1_Annonce sous6cat1 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat6)
                .nom_sous_categorie("maintien à domicile")
                .build();
        categorie1AnnonceRepository.save(sous6cat1);
        Categorie_1_Annonce sous6cat2 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat6)
                .nom_sous_categorie("Livraison de médicaments")
                .build();
        categorie1AnnonceRepository.save(sous6cat2);
        Categorie_1_Annonce sous6cat3 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat6)
                .nom_sous_categorie("Livrer des courses")
                .build();
        categorie1AnnonceRepository.save(sous6cat3);
        Categorie_1_Annonce sous6cat4 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat6)
                .nom_sous_categorie("Accompagnement en course")
                .build();
        categorie1AnnonceRepository.save(sous6cat4);
        // menage
        Categorie_1_Annonce sous7cat1 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat7)
                .nom_sous_categorie("Ménage à domicile")
                .build();
        categorie1AnnonceRepository.save(sous7cat1);
        Categorie_1_Annonce sous7cat2 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat7)
                .nom_sous_categorie("Repassage")
                .build();
        categorie1AnnonceRepository.save(sous7cat2);
        Categorie_1_Annonce sous7cat3 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat7)
                .nom_sous_categorie("Lavage automobile")
                .build();
        categorie1AnnonceRepository.save(sous7cat3);
        Categorie_1_Annonce sous7cat4 = Categorie_1_Annonce.builder()
                .categorieAnnonce(cat7)
                .nom_sous_categorie("Nettoyage des vitres")
                .build();
        categorie1AnnonceRepository.save(sous7cat4);
        // SOUS 2
        Categorie_2_Annonce sous1sous1cat1 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat1)
                .nom_sous_categorie("Montage de meubles IKEA")
                .build();
        categorie2AnnonceRepository.save(sous1sous1cat1);
        Categorie_2_Annonce sous1sous1cat2 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat1)
                .nom_sous_categorie("Montage de lit")
                .build();
        categorie2AnnonceRepository.save(sous1sous1cat2);
        Categorie_2_Annonce sous1sous1cat3 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat1)
                .nom_sous_categorie("Montage de meubles de cuisine")
                .build();
        categorie2AnnonceRepository.save(sous1sous1cat3);
        Categorie_2_Annonce sous1sous1cat4 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat1)
                .nom_sous_categorie("Montage de meubles de salle bain")
                .build();
        categorie2AnnonceRepository.save(sous1sous1cat4);
        Categorie_2_Annonce sous1sous1cat5 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat1)
                .nom_sous_categorie("Réparation de meubles")
                .build();
        categorie2AnnonceRepository.save(sous1sous1cat5);
        // Pose et fixation
        Categorie_2_Annonce sous1sous2cat1 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat2)
                .nom_sous_categorie("Pose de tringles à rideaux")
                .build();
        categorie2AnnonceRepository.save(sous1sous2cat1);
        Categorie_2_Annonce sous1sous2cat2 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat2)
                .nom_sous_categorie("Fixation d'étagéres")
                .build();
        categorie2AnnonceRepository.save(sous1sous2cat2);
        Categorie_2_Annonce sous1sous2cat3 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat2)
                .nom_sous_categorie("Accrocher une TV au mur")
                .build();
        categorie2AnnonceRepository.save(sous1sous2cat3);
        Categorie_2_Annonce sous1sous2cat4 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat2)
                .nom_sous_categorie("Pose de paroi de douche")
                .build();
        categorie2AnnonceRepository.save(sous1sous2cat4);
        Categorie_2_Annonce sous1sous2cat5 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat2)
                .nom_sous_categorie("Pose de hotte aspirante")
                .build();
        categorie2AnnonceRepository.save(sous1sous2cat5);
        Categorie_2_Annonce sous1sous2cat6 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat2)
                .nom_sous_categorie("Remplacer une porte")
                .build();
        categorie2AnnonceRepository.save(sous1sous2cat6);
        Categorie_2_Annonce sous1sous2cat7 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat2)
                .nom_sous_categorie("Changer une poignée")
                .build();
        categorie2AnnonceRepository.save(sous1sous2cat7);
        // PLOMBERIE
        Categorie_2_Annonce sous1sous3cat1 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("Réparation de fuite d'eau")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat1);
        Categorie_2_Annonce sous1sous3cat2 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("Changer de chasse d'eau")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat2);
        Categorie_2_Annonce sous1sous3cat3 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("Changer un robinet")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat3);
        Categorie_2_Annonce sous1sous3cat4 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("déboucher un évier")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat4);
        Categorie_2_Annonce sous1sous3cat5 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("Déboucher des WC")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat5);
        Categorie_2_Annonce sous1sous3cat6 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("Faire les joins de la salle de bain")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat6);
        Categorie_2_Annonce sous1sous3cat7 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("Réparer une chasse d'eau")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat7);
        Categorie_2_Annonce sous1sous3cat8 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("Changer un siphon")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat8);
        Categorie_2_Annonce sous1sous3cat9 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat3)
                .nom_sous_categorie("Détartrage de toilettes")
                .build();
        categorie2AnnonceRepository.save(sous1sous3cat9);
        // electricité
        Categorie_2_Annonce sous1sous4cat1 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat4)
                .nom_sous_categorie("Installation de prise électrique")
                .build();
        categorie2AnnonceRepository.save(sous1sous4cat1);
        Categorie_2_Annonce sous1sous4cat2 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat4)
                .nom_sous_categorie("Installation d'interrupteur")
                .build();
        categorie2AnnonceRepository.save(sous1sous4cat2);
        Categorie_2_Annonce sous1sous4cat3 = Categorie_2_Annonce.builder()
                .categorie_1_Annonce(souscat4)
                .nom_sous_categorie("Installation d'un radiateur électrique")
                .build();
        categorie2AnnonceRepository.save(sous1sous4cat3);


        // filling database with pro users
        User user = new User();
        user.setCIN("BL13232");
        user.setRole(rolepro);
        user.setEmail("azz@gmail.com");
        user.setPrenom("azzedine");
        user.setUsername("azzedine12");
        user.setPassword(encoder.encode("azzedine"));
        List<Categorie_1_Annonce> competences = new ArrayList<>();
        competences.add(souscat1);
        competences.add(souscat2);
        competences.add(sous2cat1);
        user.setCompetences(competences);
        user.setNum_tel("+212 687 784");
        user.setNom("MOHA");

        User user1 = new User();
        user1.setCIN("LK13232");
        user1.setRole(rolepro);
        user1.setEmail("jonsnow@gmail.com");
        user1.setPrenom("Jon");
        user1.setUsername("jonsnow");
        user1.setStatusUser(StatusUser.Actif);
        user1.setPassword(encoder.encode("123456"));
        List<Categorie_1_Annonce> competences1 = new ArrayList<>();
        competences1.add(sous3cat1);
        competences1.add(sous3cat3);
        competences1.add(sous4cat1);
        user1.setCompetences(competences1);
        user1.setNum_tel("+212 687 774452");
        user1.setNom("Snow");

        User user2 = new User();
        user2.setCIN("BL1323245");
        user2.setRole(rolepro);
        user2.setStatusUser(StatusUser.Actif);
        user2.setEmail("bran@gmail.com");
        user2.setPrenom("Bran");
        user2.setUsername("bran");
        user2.setPassword(encoder.encode("123456"));
        List<Categorie_1_Annonce> competences2 = new ArrayList<>();
        competences2.add(sous5cat1);
        competences2.add(sous3cat1);
        competences2.add(sous6cat1);
        user2.setCompetences(competences2);
        user2.setNum_tel("+212 613 457842");
        user2.setNom("Stark");

        User user3 = new User();
        user3.setCIN("BL13232");
        user3.setRole(rolestandard);
        user3.setStatusUser(StatusUser.Actif);
        user3.setEmail("cristiano@gmail.com");
        user3.setPrenom("Dwayne");
        user3.setUsername("johnson");
        user3.setPassword(encoder.encode("123456"));
        user3.setNum_tel("+212 687 784452");
        user3.setNom("Johnson");

        User user4 = new User();
        user4.setCIN("BL1323245");
        user4.setRole(rolepro);
        user4.setStatusUser(StatusUser.Actif);
        user4.setEmail("hakimi@gmail.com");
        user4.setPrenom("Hakimi");
        user4.setUsername("hakimi");
        user4.setPassword(encoder.encode("123456"));
        List<Categorie_1_Annonce> competences4 = new ArrayList<>();
        competences4.add(sous6cat1);
        competences4.add(sous4cat3);
        competences4.add(sous2cat1);
        user4.setCompetences(competences4);
        user4.setNum_tel("+212 687 458441");
        user4.setNom("Achraf");

        User user5 = new User();
        user5.setCIN("A18X30270");
        user5.setRole(rolepro);
        user5.setStatusUser(StatusUser.Actif);
        user5.setEmail("nirinamercia@gmail.com");
        user5.setPrenom("Nirina");
        user5.setUsername("nirina");
        user5.setPassword(encoder.encode("123456"));
        List<Categorie_1_Annonce> competences5 = new ArrayList<>();
        competences5.add(sous2cat1);
        competences5.add(sous5cat1);
        competences5.add(sous3cat1);
        competences5.add(sous6cat3);
        competences5.add(sous5cat3);
        user5.setCompetences(competences5);
        user5.setNum_tel("+212 631 821328");
        user5.setNom("Rakotoniary");
        userRepository.save(user);
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);
        userRepository.save(user5);

        User user6 = new User();
        user6.setCIN("BL1323245");
        user6.setRole(rolestandard);
        user6.setStatusUser(StatusUser.Actif);
        user6.setEmail("aryastark@gmail.com");
        user6.setPrenom("Arya");
        user6.setUsername("arya");
        user6.setPassword(encoder.encode("123456"));
        user6.setNum_tel("+212 687 786513");
        user6.setNom("Stark");
        userRepository.save(user6);

        User user7 = new User();
        user7.setNum_tel("+212 612 458551");
        user7.setRole(rolestandard);
        user7.setEmail("harrypotter@gmail.com");
        user7.setNom("Potter");
        user7.setPassword(encoder.encode("123456"));
        user7.setPrenom("Harry");
        user7.setStatusUser(StatusUser.Actif);
        user7.setUsername("harry");
        user7.setCIN("HD47512D8A");
        userRepository.save(user7);

        Annonce annonce1 = new Annonce();
        annonce1.setStatusAnnonce(StatusAnnonce.EnCours);
        annonce1.setDate(new Date(2023,5,9));
        annonce1.setDuree("02h30");
        Adresse adresse = new Adresse();
        adresse.setVille("Agadir");
        adresse.setQuartier("Tilila");
        adresseRepository.save(adresse);
        annonce1.setAdresse(adresse);
        annonce1.setCategorie1Annonce(categorie1AnnonceRepository.findCategorie_1_AnnonceById(4L));
        annonce1.setInfos_complementaire("Je recherche un éléctricien qui peut arranger le branchement chez moi");
        annonce1.setUser(user6);
        annonceRepository.save(annonce1);

        Annonce annonce2 = new Annonce();
        annonce2.setStatusAnnonce(StatusAnnonce.EnCours);
        annonce2.setDate(new Date(123, 5, 12));
        annonce2.setDuree("1h30");
        Adresse adresse1 = new Adresse();
        adresse1.setVille("Agadir");
        adresse1.setQuartier("El Houda");
        adresseRepository.save(adresse1);
        annonce2.setAdresse(adresse1);
        annonce2.setCategorie1Annonce(categorie1AnnonceRepository.findCategorie_1_AnnonceById(15L));
        annonce2.setInfos_complementaire("Je viens de m'installer dans mon nouveau appartement et je dois réinstaller mon Box Wifi le plus vite possible");
        annonce2.setUser(user3);
        annonceRepository.save(annonce2);

        Annonce annonce3 = new Annonce();
        annonce3.setStatusAnnonce(StatusAnnonce.EnCours);
        annonce3.setDate(new Date(123, 5, 10));
        annonce3.setDuree("3h");
        Adresse adresse2 = new Adresse();
        adresse2.setVille("Agadir");
        adresse2.setQuartier("Hay Dakhla");
        adresseRepository.save(adresse2);
        annonce3.setAdresse(adresse2);
        annonce3.setCategorie1Annonce(categorie1AnnonceRepository.findCategorie_1_AnnonceById(25L));
        annonce3.setInfos_complementaire("Je cherche quelqu'un qui peut repasser mes habits, je vais partir en voyage ce week-end avec");
        annonce3.setUser(user6);
        annonceRepository.save(annonce3);

        Annonce annonce4 = new Annonce();
        annonce4.setStatusAnnonce(StatusAnnonce.EnCours);
        annonce4.setDate(new Date(123, 5,8));
        annonce4.setDuree("1h30");
        Adresse adresse3 = new Adresse();
        adresse3.setVille("Agadir");
        adresse3.setQuartier("Riad Salam");
        adresseRepository.save(adresse3);
        annonce4.setAdresse(adresse3);
        annonce4.setInfos_complementaire("Y a-t-il un plombier quelque part ici, c'est pour reparer un tuyau dans ma cuisine car c'est cassé. C'est urgent");
        annonce4.setCategorie1Annonce(categorie1AnnonceRepository.findCategorie_1_AnnonceById(3L));
        annonce4.setUser(user3);
        annonceRepository.save(annonce4);

        Annonce annonce5 = new Annonce();
        annonce5.setStatusAnnonce(StatusAnnonce.EnCours);
        annonce5.setDate(new Date(123, 5, 12));
        annonce5.setDuree("1h");
        Adresse adresse4 = new Adresse();
        adresse4.setVille("Agadir");
        adresse4.setQuartier("El Houda");
        adresseRepository.save(adresse4);
        annonce5.setAdresse(adresse4);
        annonce5.setInfos_complementaire("Quelqu'un peut faire lavage automobile près de marjane");
        annonce5.setCategorie1Annonce(categorie1AnnonceRepository.findCategorie_1_AnnonceById(26L));
        annonce5.setUser(user6);
        annonceRepository.save(annonce5);

        Annonce annonce6 = new Annonce();
        annonce6.setUser(user7);
        annonce6.setDate(new Date(123, 5,10));
        annonce6.setDuree("24h");
        Adresse adresse5 = new Adresse();
        adresse5.setVille("Agadir");
        adresse5.setQuartier("El Farah");
        adresseRepository.save(adresse5);
        annonce6.setAdresse(adresse5);
        annonce6.setInfos_complementaire("Je vais voyager ce week-end et cherche quelqu'un qui peut garder mon chien, juste pour une journée");
        annonce6.setCategorie1Annonce(categorie1AnnonceRepository.findCategorie_1_AnnonceById(5L));
        annonceRepository.save(annonce6);

        Annonce annonce7 = new Annonce();
        annonce7.setUser(user7);
        annonce7.setDate(new Date(123,5,11));
        annonce7.setInfos_complementaire("Quelqu'un sera disponible ici ce dimanche pour m'accompagner à faire la course?");
        Adresse adresse6 = new Adresse();
        adresse6.setVille("Agadir");
        adresse6.setQuartier("Souk El Ahad");
        adresseRepository.save(adresse6);
        annonce7.setAdresse(adresse6);
        annonce7.setDate(new Date(123,5,11));
        annonce7.setDuree("2h30");
        annonce7.setUser(user7);
        annonce7.setCategorie1Annonce(categorie1AnnonceRepository.findCategorie_1_AnnonceById(23L));
        annonceRepository.save(annonce7);
    }
}