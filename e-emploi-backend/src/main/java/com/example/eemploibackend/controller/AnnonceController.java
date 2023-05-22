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
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> suprrimerannonce(@PathVariable(value = "id")Long id,
                                              @CurrentUser User user){
        if (annonceService.supprimerannonce(id,user))
        return new ResponseEntity(new ApiResponse(true,"annonce supprimé"),
                HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(false,"something goes wrong"),
                HttpStatus.BAD_REQUEST);
    }
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
    @GetMapping("/category/{id}")
    public PagedResponse<AnnonceResponse> getannoncespercaregory(@PathVariable(value = "id") Long id,
                                                                 @RequestParam(value = "page", defaultValue ="0") int page,
                                                                 @RequestParam(value = "size", defaultValue = "30") int size,
                                                                 @RequestParam(value = "search",defaultValue="") String search,
                                                                 @RequestParam(value = "max_tarif_dep",defaultValue = "10")double max_tarif_dep,
                                                                 @RequestParam(value = "min_tarif_dep",defaultValue = "0")double min_tarif_dep)
    {
     return annonceService.getaaonnoncesparcategorie(id,page,size,search,max_tarif_dep,min_tarif_dep);
    }

    // Mes demandes
    @GetMapping("/mesdemandes/{iduser}")
    public List<AnnonceResponse> getAnnonceByUser(@PathVariable(value = "iduser")Long iduser){
        return annonceService.getDemandespariduser(iduser);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AnnonceResponse> getaanoncebyid(@PathVariable(value = "id")Long id){
        return ResponseEntity.ok(ModelMapper.mapannonceToAnnonceResponse(annonceService.getannoncebyid(id))) ;
    }

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
    @DeleteMapping("/deletefile/{id}")
    public ResponseEntity<?> deletepic(@PathVariable(value = "id")Long id){
        if(annonceService.deletefile(id))
            return new ResponseEntity(new ApiResponse(true,"Image suprimé"),HttpStatus.OK);
        return new ResponseEntity(new ApiResponse(true,"id n'existe pas"),HttpStatus.BAD_REQUEST);
    }

}

