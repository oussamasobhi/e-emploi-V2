package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.PostuleAnnonceRequest;
import com.example.eemploibackend.services.AnnonceUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
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
}
