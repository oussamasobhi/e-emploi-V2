package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Competence;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.CompetenceRequest;
import com.example.eemploibackend.repository.CompetenceRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompetenceService {
    private final CompetenceRepository competenceRepository;
    private final UserRepository userRepository;
    public void ajoutercompetence(CompetenceRequest request,Long iduser){
        Competence competence= Competence.builder()
                .titre(request.getTitre())
                .date_obtention(request.getDate_obtention())
                .duree_formation(request.getDuree_formation())
                .niveauscolaire(request.getNiveauscolaire())
                .duree_exp(request.getDuree_exp())
                .build();
    User user=userRepository.findUserById(iduser);
    competence.setUser(user);
    competenceRepository.save(competence);
}
public void modifiercompetence(CompetenceRequest request,Long idcomp){
        Competence competence=competenceRepository.findCompetenceById(idcomp);
        competence.setDuree_exp(request.getDuree_exp());
        competence.setNiveauscolaire(request.getNiveauscolaire());
        competence.setTitre(request.getTitre());
        competence.setDate_obtention(request.getDate_obtention());
        competence.setDuree_formation(request.getDuree_formation());
        competenceRepository.save(competence);
}
public void supprimercompetence(Long idcomp){
        competenceRepository.deleteById(idcomp);
}
public List<Competence> getcomptencesbyuserid(Long iduser){
        return competenceRepository.findAllByUserId(iduser);
}
public List<Competence> getcompetencebyusername(String username){return competenceRepository.findAllByUsername(username);}
}
