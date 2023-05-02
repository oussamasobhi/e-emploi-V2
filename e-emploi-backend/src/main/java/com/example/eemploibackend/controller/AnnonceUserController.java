package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.FilesResponse;
import com.example.eemploibackend.payloads.PostuleAnnonceRequest;
import com.example.eemploibackend.services.AnnonceUserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/annonceuser")
public class AnnonceUserController {
    private final AnnonceUserService annonceUserService;
    @PostMapping("/add")
    public ResponseEntity<?> postulerpourAnnonce(@RequestBody PostuleAnnonceRequest request,
                                                 @CurrentUser User user){
        annonceUserService.ajouterannonceuser(request,user.getId());
        return new ResponseEntity(new ApiResponse(true,"Vous avez postulé avec succes"),
                HttpStatus.ACCEPTED);
    }
    @GetMapping("/documents/{idannonce}/{iduser}")
    public List<FilesResponse> getalldocs(@PathVariable(value = "idannonce")Long idannonce,
                                          @PathVariable(value = "iduser")Long iduser){
        return annonceUserService.recupererfiles(idannonce,iduser);
    }
    @PostMapping("/upload/{idannonce}/{iduser}")
    public ResponseEntity<?> uploadimage(@RequestParam("file")MultipartFile file,
                                         @PathVariable(value = "idannonce")Long idannonce,
                                         @PathVariable(value = "iduser")Long iduser) throws IOException {
        if(annonceUserService.upmoadimageAnnonceUser(idannonce,iduser,file))
        return new ResponseEntity(new ApiResponse(true,"Vous avez uploadé avec succes"), HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(false,"Y a un erreur"),
                HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/download/{idannonce}/{iduser}")
    public List<FileDB> getfilesbyannonceuser(@PathVariable(value = "idannonce")Long idannonce,
                                              @PathVariable(value = "iduser")Long iduser){
        Logger log= LoggerFactory.getLogger(AnnonceUserService.class);
        List<FileDB> files=annonceUserService.getallfiles(idannonce,iduser);
        if(files.size()==0){

            log.info("yeww");
        }
        else{
            log.info("ehooo");
        }
        return files;
    }
    @DeleteMapping("/deletefile/{id}")
    public ResponseEntity<?> deletepic(@PathVariable(value = "id")Long id){
        if(annonceUserService.deletefile(id))
            return new ResponseEntity(new ApiResponse(true,"Image suprimé"),HttpStatus.OK);
        return new ResponseEntity(new ApiResponse(true,"id n'existe pas"),HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/updateStatus/discussionEngage/{idannonce}/{iduser}")
    public ResponseEntity<?> updatestatustodiscussion(@PathVariable(name = "idannonce")Long idannonce,
                                          @PathVariable(name = "iduser")Long iduser){
        if(annonceUserService.passeAdiscussionEngage(idannonce, iduser)){
            return new ResponseEntity(new ApiResponse(true,"status modifié"),HttpStatus.OK);
        }
        return new ResponseEntity(new ApiResponse(true,"erreur"),HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/updateStatus/accordetablie/{idannonce}/{iduser}")
    public ResponseEntity<?> updatestatustoaccord(@PathVariable(name = "idannonce")Long idannonce,
                                          @PathVariable(name = "iduser")Long iduser){
        if(annonceUserService.passeAaccordEtablie(idannonce, iduser)){
            return new ResponseEntity(new ApiResponse(true,"status modifié"),HttpStatus.OK);
        }
        return new ResponseEntity(new ApiResponse(true,"erreur"),HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/updateStatus/termine/{idannonce}/{iduser}")
    public ResponseEntity<?> updatestatustotermine(@PathVariable(name = "idannonce")Long idannonce,
                                          @PathVariable(name = "iduser")Long iduser){
        if(annonceUserService.passeAtermine(idannonce, iduser)){
            return new ResponseEntity(new ApiResponse(true,"status modifié"),HttpStatus.OK);
        }
        return new ResponseEntity(new ApiResponse(true,"erreur"),HttpStatus.BAD_REQUEST);
    }
}
