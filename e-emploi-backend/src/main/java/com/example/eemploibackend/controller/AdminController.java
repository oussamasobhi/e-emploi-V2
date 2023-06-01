package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Annonce;
import com.example.eemploibackend.model.AnnonceUser;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.UserRepository;
import com.example.eemploibackend.services.AdminService;
import com.example.eemploibackend.services.AnnonceService;
import com.example.eemploibackend.services.AnnonceUserService;
import com.example.eemploibackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin")
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")

@RequiredArgsConstructor
@CrossOrigin
public class AdminController {
    private final AnnonceService annonceService;
    private final AnnonceUserService annonceUserService;
    private final AdminService adminService;
    private final UserRepository userRepository;
    private final UserService userService;
    @PutMapping("/profile/edit")
 // modifier un admin
    public ResponseEntity<?> updateadmin(@RequestBody AdminRequest request,
                                       @CurrentUser User user) {
             return adminService.updateadmin(request,user);
    }
    @DeleteMapping("/profile/delete")
    public ResponseEntity<?> deleteadmin(@CurrentUser User user) {
        userRepository.delete(user);
        return new ResponseEntity(new ApiResponse(true,"admin supprimé"),
                HttpStatus.ACCEPTED);
    }
    // CRUD ON USERS
    @GetMapping("/users")
    public PagedResponse<UserResponse> getAllusers(@RequestParam(value = "page", defaultValue ="0") int page,
                                                   @RequestParam(value = "size", defaultValue = "30") int size){

                return adminService.getAllusers(page, size);
    }
    @PutMapping("/users/edit/{username}")
    public ResponseEntity<?> updateuser(@PathVariable(value="username") String username,@RequestBody Pro_RegisterRequest request){
        Long id=userRepository.findIdByUsername(username);
        userService.updateuser(request,id);
        return new ResponseEntity<>(new ApiResponse(true,"user modifié"), HttpStatus.OK);
    }
    //suppression d'un utilisateur
   @DeleteMapping("/users/delete/{username}")
    public ResponseEntity<?> deleteuser(@PathVariable(value="username") String username){
    Long id=userRepository.findIdByUsername(username);
    userRepository.deleteById(id);
    return new ResponseEntity(new ApiResponse(true,"user supprimé"),
            HttpStatus.ACCEPTED);
}

    @GetMapping("/users/{username}")
    public User getUserProfile(@PathVariable(value = "username") String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return user;
    }
    // CRUD on annonces
    @GetMapping("/annonces")
    public List<AnnonceResponse> getannonces(){
        return annonceService.getAllAnnonce();
    }
    @PostMapping("/annonces/add")
    public ResponseEntity<?> addannonce(@RequestBody AnnonceRequest request, @CurrentUser User user){
        annonceService.ajouterannonce(user,request);
        return new ResponseEntity<>(new ApiResponse(true,"annonce ajouté"),
                HttpStatus.ACCEPTED);
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
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> suprrimerannonce(@PathVariable(value = "id")Long id,
                                              @CurrentUser User user){
        if (annonceService.supprimerannonce(id,user))
            return new ResponseEntity(new ApiResponse(true,"annonce supprimé"),
                    HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(false,"something goes wrong"),
                HttpStatus.BAD_REQUEST);
    }
    // CRUD Annoceuser / offres
    @PostMapping("/add")
    public ResponseEntity<?> postulerpourAnnonce(@RequestBody PostuleAnnonceRequest request,
                                                 @CurrentUser User user){
        annonceUserService.ajouterannonceuser(request,user.getId());
        return new ResponseEntity(new ApiResponse(true,"Vous avez postulé avec succes"),
                HttpStatus.ACCEPTED);
    }
    // tous les demandes qu un prestataire a fait
    @GetMapping("/{iduser}")
    public ResponseEntity<List<AnnonceUser>> getAllAnnonceUser(@PathVariable(name = "iduser") Long iduser){
        return ResponseEntity.ok(annonceUserService.getAllAnnonceUsers(iduser));
    }
    // offres recus pour une annonces
    @GetMapping("/offresrecues/{idannonce}")
    public List<AnnonceUser> getoffres(@PathVariable(value = "idannonce") Long idannonce){
        return annonceUserService.getoffresrecues(idannonce);
    }

}
