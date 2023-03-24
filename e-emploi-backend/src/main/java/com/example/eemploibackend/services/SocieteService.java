package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.Adresse_societe;
import com.example.eemploibackend.model.Societe;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.AddressRequest;
import com.example.eemploibackend.payloads.SocieteRequest;
import com.example.eemploibackend.repository.AdresseSocietyRepository;
import com.example.eemploibackend.repository.SocieteRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class SocieteService {
    private final SocieteRepository societeRepository;
    private final AdresseSocietyRepository adresseSocietyRepository;
    private final UserRepository userRepository;
    public void createsociete(SocieteRequest societeRequest, User user){
        Societe societe= Societe.builder()
                .nom_societe(societeRequest.getNom_societe())
                .num_patente(societeRequest.getNum_patente())
                .num_tel(societeRequest.getNum_tel())
                .siteweb(societeRequest.getSiteweb())
                .justif_image(societeRequest.getJustif_image())
                .build();
        societeRepository.save(societe);
        user.setSociete(societe);
        userRepository.save(user);
    }
public void editsociete(SocieteRequest societeRequest,Long idsociete){
      Societe societe=societeRepository.findById(idsociete).orElseThrow();
      societe.setNom_societe(societeRequest.getNom_societe());
      societe.setSiteweb(societeRequest.getSiteweb());
      societe.setNum_tel(societeRequest.getNum_tel());
      societe.setNum_patente(societeRequest.getNum_patente());
      societe.setJustif_image(societeRequest.getJustif_image());
      societeRepository.save(societe);
}
public void updateAdresseSociete(AddressRequest request,Long idaddress){
        Adresse_societe adresseSociete=adresseSocietyRepository.findById(idaddress).orElseThrow();
        adresseSociete.setPays(request.getPays());
        adresseSociete.setVille(request.getVille());
        adresseSociete.setLibelle_adr(request.getLib_addre());
    adresseSocietyRepository.save(adresseSociete);
}
public void createadresssociety(AddressRequest request,Long idsociety){
        Societe societe=societeRepository.findById(idsociety).orElseThrow();
        Adresse_societe adresseSociete= Adresse_societe.builder()
                .pays(request.getPays())
                .libelle_adr(request.getLib_addre())
                .ville(request.getVille())
                .societe(societe)
                .build();
        adresseSocietyRepository.save(adresseSociete);
}
}
