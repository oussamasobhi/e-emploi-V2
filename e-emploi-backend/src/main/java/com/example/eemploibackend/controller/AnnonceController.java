package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.AnnonceRepository;
import com.example.eemploibackend.services.AnnonceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/annonce")
@CrossOrigin
public class AnnonceController {
    private final AnnonceService annonceService;
    @PostMapping("/add")
    public ResponseEntity<?> addannonce(@RequestBody AnnonceRequest request, @CurrentUser User user){
        annonceService.ajouterannonce(user,request);
        return new ResponseEntity(new ApiResponse(true,"annonce ajouté"),
                HttpStatus.ACCEPTED);
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
    @GetMapping("/{id}")
    public AnnonceResponse getaanoncebyid(@PathVariable(value = "id")Long id){
        return ModelMapper.mapannonceToAnnonceResponse(annonceService.getannoncebyid(id));
    }
}

