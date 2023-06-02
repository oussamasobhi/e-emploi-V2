package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.*;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.UserRepository;
import com.example.eemploibackend.services.*;
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
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {
    private final AnnonceService annonceService;
    private final CategoryService categoryService;
    private final AnnonceUserService annonceUserService;
    private final AdminService adminService;
    private final UserRepository userRepository;
    private final SousCategorieService souscategoryservice;
    private final UserService userService;
    private final SoussousCategory soussousCategory;

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

}
