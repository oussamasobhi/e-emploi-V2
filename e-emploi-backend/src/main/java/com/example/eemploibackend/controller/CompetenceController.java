package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.Competence;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.CompetenceRequest;
import com.example.eemploibackend.services.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users/competence")
@RequiredArgsConstructor
@CrossOrigin
public class CompetenceController {
    private final CompetenceService competenceService;
    @PostMapping("/add")
    public ResponseEntity<?> addcompetence(@CurrentUser User user,@RequestBody CompetenceRequest request){
       competenceService.ajoutercompetence(request,user.getId());
        return new ResponseEntity(new ApiResponse(true,"competence ajouté"), HttpStatus.ACCEPTED);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> modifiercompetence(@RequestBody CompetenceRequest competenceRequest,
                                                @PathVariable(value = "id") Long idcomp){
        competenceService.modifiercompetence(competenceRequest,idcomp);
        return new ResponseEntity(new ApiResponse(true,"competence modifié"),HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> supprimercompetence(@PathVariable(value="id") Long idcomp){
        competenceService.supprimercompetence(idcomp);
        return new ResponseEntity(new ApiResponse(true,"competence supprimé"),HttpStatus.ACCEPTED);
    }
    @GetMapping("/")
    public List<Competence> getcompetencebyuser(@CurrentUser User user){
             return competenceService.getcomptencesbyuserid(user.getId());
    }
}
