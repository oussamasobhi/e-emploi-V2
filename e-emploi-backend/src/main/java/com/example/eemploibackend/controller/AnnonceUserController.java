package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.FilesResponse;
import com.example.eemploibackend.payloads.PostuleAnnonceRequest;
import com.example.eemploibackend.services.AnnonceUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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
        return annonceUserService.getallfiles(idannonce,iduser);
    }
}
