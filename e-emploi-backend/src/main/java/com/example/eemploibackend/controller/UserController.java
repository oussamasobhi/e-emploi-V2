package com.example.eemploibackend.controller;


import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Categorie_1_Annonce;
import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;

import com.example.eemploibackend.repository.UserRepository;
import com.example.eemploibackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    private final UserService userService;

    @GetMapping("/user/me")
    public UserSummary getCurrentUser(@CurrentUser User currentUser) {

        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
        UserSummary userSummary=userService.mapusertoSummary(user);
        return userSummary;
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @GetMapping("/users/{username}")
    public UserSummary getUserProfile(@PathVariable(value = "username") String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        UserSummary userSummary=userService.mapusertoSummary(user);
        return userSummary;
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @GetMapping("/users")
    public ResponseEntity<?> getUserById(@RequestParam("id") Long id){
        try{
            return ResponseEntity.ok(userService.getUserById(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(
            @RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(
            @RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @PutMapping("users/edit")
    public ResponseEntity<?> updateuser(@RequestBody Pro_RegisterRequest request, @CurrentUser User user) {
        userService.updateuser(request, user.getId());
        return new ResponseEntity<>(new ApiResponse(true, "user modifié"), HttpStatus.OK);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @DeleteMapping("users/delete")
    public ResponseEntity<?> deleteuser(@CurrentUser User user) {
        userRepository.deleteById(user.getId());
        return new ResponseEntity(new ApiResponse(true, "user supprimé"),
                HttpStatus.ACCEPTED);
    }

    // reset password
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @PostMapping("/resetpassword")
    public ResponseEntity<?> resetpassword(@RequestBody ResetPasswordRequest request,@CurrentUser User user){
         Boolean done=userService.resetpassword(request,user.getId());
         if(done){
             return new ResponseEntity(new ApiResponse(true,"mot de passe modifié"),HttpStatus.OK);
         }
         else{
             return new ResponseEntity(new ApiResponse(true,"mot de passe ancienne est fausse"),HttpStatus.BAD_REQUEST);
         }

    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @PostMapping("/photoprofile/add")
    public ResponseEntity<?> ajouterphotodeprofil(@CurrentUser User user,
                                                  @RequestParam(value = "file") MultipartFile file) throws IOException {
        if(userService.addprofilepic(user,file))
        return new ResponseEntity(new ApiResponse(true,"Image ajouté"),HttpStatus.OK);
        return new ResponseEntity(new ApiResponse(true,"ajout a echoué"),HttpStatus.BAD_REQUEST);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @DeleteMapping("/photoprofile/delete/{filename}")
    public ResponseEntity<?> deletepic(@PathVariable(value = "filename")String filename){
        userService.supprimerpic(filename);
        return new ResponseEntity(new ApiResponse(true,"Image suprimé"),HttpStatus.OK);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @GetMapping("/download/{iduser}")
    public FileDB getfilebyuserid(@PathVariable(value = "iduser")Long iduser){
        return userService.getfilebyuserid(iduser);
    }

    // get four random users dor par page 1
    @GetMapping("/randompro")
    public List<UserResponse> randoms(){
        return userService.getrandomusers();
    }
    @GetMapping("/randompro/{id}")
    public List<UserResponse> randomsbycategory(@PathVariable(name = "id")Long id){
        return userService.getrandomsbycategory(id);
    }

    @PutMapping("users/suspendre/{id}")
    public ResponseEntity<?> suspendreuser(@PathVariable(value = "id")Long id){
        userService.suspendreuser(id);
        return new ResponseEntity<>("utilisateur suspendu",HttpStatus.OK);
    }
    // les competences d'un user
    @GetMapping("users/{id}/competences")
    public List<Categorie_1_Annonce> getcompetences(@PathVariable(value = "id")Long id){
        return userService.getcompetences(id);
    }
}

