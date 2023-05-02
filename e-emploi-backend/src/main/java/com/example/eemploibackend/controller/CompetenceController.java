package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.Competence;
import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.CompetenceRequest;
import com.example.eemploibackend.services.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    @GetMapping("/{username}")
    public List<Competence> getcompetence(@PathVariable(value = "username") String username){
        return competenceService.getcompetencebyusername(username);
    }
    @PostMapping("/upload/{idcompetence}")
    public ResponseEntity<?> uploadimage(@RequestParam("file")MultipartFile file,
                                         @PathVariable(value = "idcompetence")Long idcompetence) throws IOException {
        if(competenceService.uploadimage(file,idcompetence))
        return new ResponseEntity(new ApiResponse(true,"image ajouté"),HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(true,"ajout a echoué"),HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/download/{idcompetence}")
    public List<FileDB> recuperefile(@PathVariable(value = "idcompetence")Long idcompetence){
        return competenceService.recupererfile(idcompetence);
    }
    @DeleteMapping("/deletefile/{id}")
    public ResponseEntity<?> deleteimage(@PathVariable(name = "id")Long id){
        if(competenceService.deleteimage(id))
            return new ResponseEntity(new ApiResponse(true,"image supprimé"),HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(true,"erreur"),HttpStatus.BAD_REQUEST);

    }
}
