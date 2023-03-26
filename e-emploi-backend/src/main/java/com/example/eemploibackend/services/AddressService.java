package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Adresse;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.AddressRequest;
import com.example.eemploibackend.repository.AdresseRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AdresseRepository adresseRepository;
    private final UserRepository userRepository;
    public void ajouteradresse(AddressRequest request, Long id){
        User user=userRepository.findUserById(id);
        List<Adresse> adresseList=user.getAdresses();
        Adresse adresse= Adresse.builder()
                .pays(request.getPays())
                .ville(request.getVille())
                .libelle_adr(request.getLib_addre())
                .user(user)
                .build();
        adresseList.add(adresse);
        user.setAdresses(adresseList);
        userRepository.save(user);
        adresseRepository.save(adresse);
    }
    public void modifieradresse(AddressRequest request,Long idaddr){

        Adresse adr=adresseRepository.findAdresseById(idaddr);
        adr.setVille(request.getVille());
        adr.setPays(request.getPays());
        adr.setLibelle_adr(request.getLib_addre());
        adresseRepository.save(adr);
    }
    public void supprimeradresse(Long id){
        adresseRepository.deleteById(id);
    }
}
