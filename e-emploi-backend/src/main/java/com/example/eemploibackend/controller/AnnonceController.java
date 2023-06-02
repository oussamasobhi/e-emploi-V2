package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.Annonce;
import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.AnnonceRepository;
import com.example.eemploibackend.services.AnnonceService;
import com.example.eemploibackend.services.AnnonceUserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/annonce")
@CrossOrigin
public class AnnonceController {
    private final AnnonceService annonceService;
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<?> addannonce(@RequestBody AnnonceRequest request, @CurrentUser User user){
        annonceService.ajouterannonce(user,request);
        return new ResponseEntity<>(new ApiResponse(true,"annonce ajouté"),
                HttpStatus.ACCEPTED);
    }

    @GetMapping
    public ResponseEntity<List<AnnonceResponse>> getAll(){
        return ResponseEntity.ok(annonceService.getAllAnnonce());
    }
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> suprrimerannonce(@PathVariable(value = "id")Long id,
                                              @CurrentUser User user){
        if (annonceService.supprimerannonce(id,user))
        return new ResponseEntity(new ApiResponse(true,"annonce supprimé"),
                HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(false,"something goes wrong"),
                HttpStatus.BAD_REQUEST);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_ADMIN')")
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> modifierannonce(@RequestBody AnnonceRequest request,
                                             @CurrentUser User user,
                                             @PathVariable(value = "id") Long id){
        if (annonceService.modifierannonce(request,user,id))
            return new ResponseEntity(new ApiResponse(true,"annonce modifié"),
                    HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(false,"something goes wrong"),
                HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/all")
    public PagedResponse<AnnonceResponse> getannoncespercartegoryandAdress(@PathVariable(value = "id") Long id,
                                                                 @RequestParam(value = "page", defaultValue ="0") int page,
                                                                 @RequestParam(value = "size", defaultValue = "30") int size,
                                                                 @RequestBody SearchRequest request)
    {
        return annonceService.getaaonnoncesparcategorie(request, page, size);
    }

    // Mes annonces ( que j'ai cree)
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_ADMIN')")
    @GetMapping("/mesdemandes/{iduser}")
    public List<AnnonceResponse> getAnnonceByUser(@PathVariable(value = "iduser")Long iduser){
        return annonceService.getDemandespariduser(iduser);
    }
    // les annonces que j y postulé
    @PreAuthorize("hasAnyAuthority('ROLE_Pro','ROLE_ADMIN')")
    @GetMapping("/postulations/{iduser}")
    public ResponseEntity<List<AnnonceResponse>> getPostulationsByUserId(@PathVariable(value = "iduser") Long iduser){
        return ResponseEntity.ok(annonceService.getPostulationsByUserId(iduser));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_ADMIN','ROLE_Pro')")
    @GetMapping("/{id}")
    public ResponseEntity<AnnonceResponse> getaanoncebyid(@PathVariable(value = "id")Long id){
        return ResponseEntity.ok(ModelMapper.mapannonceToAnnonceResponse(annonceService.getannoncebyid(id))) ;
    }
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_ADMIN')")
    @PostMapping("/upload/{idannonce}")
    public ResponseEntity<?> uploadimage(@RequestParam("file") MultipartFile file,
                                         @PathVariable(value = "idannonce")Long idannonce) throws IOException {
        if(annonceService.uploadimageAnnonce(idannonce,file))
            return new ResponseEntity(new ApiResponse(true,"Vous avez uploadé avec succes"), HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(false,"Y a un erreur"),
                HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/download/{idannonce}")
    public List<FileDB> getfilesbyannonceuser(@PathVariable(value = "idannonce")Long idannonce){
        Logger log= LoggerFactory.getLogger(AnnonceUserService.class);
        List<FileDB> files=annonceService.getallfiles(idannonce);
        return files;
    }
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_ADMIN')")
    @DeleteMapping("/deletefile/{id}")
    public ResponseEntity<?> deletepic(@PathVariable(value = "id")Long id){
        if(annonceService.deletefile(id))
            return new ResponseEntity(new ApiResponse(true,"Image suprimé"),HttpStatus.OK);
        return new ResponseEntity(new ApiResponse(true,"id n'existe pas"),HttpStatus.BAD_REQUEST);
    }

    // cloturer annonce
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_ADMIN')")
    @PutMapping("/cloturer/{idannonce}")
    public ResponseEntity<?> cloturerannonce(@PathVariable(value = "idannonce")Long idannonce){
        annonceService.clotureAnnonce(idannonce);
        return new ResponseEntity(new ApiResponse(true,"cloturé avec succés"),HttpStatus.OK);
    }

}

