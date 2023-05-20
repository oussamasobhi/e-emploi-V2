package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.AnnonceUser;
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
    @GetMapping("/{idannonce}/{iduser}")
    public ResponseEntity<AnnonceUser> getAnnonceUser(@PathVariable(name = "idannonce") Long idannonce,
                                                      @PathVariable(name = "iduser") Long iduser){
        return ResponseEntity.ok(annonceUserService.getAnnonceUser(idannonce, iduser));
    }
    @PutMapping("/accepterreserve/{idannonce}/{iduser}")
    public ResponseEntity<?> accepteroffrer(@PathVariable(value = "idannonce")Long idannonce,
                                            @PathVariable(value = "iduser")Long iduser){
        annonceUserService.accepterAnnonceUser(idannonce, iduser);
        return new ResponseEntity(new ApiResponse(true,"Vous avez accepté offre avec succes"),
                HttpStatus.ACCEPTED);
    }
}
