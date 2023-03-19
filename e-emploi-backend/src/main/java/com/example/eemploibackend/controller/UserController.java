package com.example.eemploibackend.controller;


import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;

import com.example.eemploibackend.repository.UserRepository;
import com.example.eemploibackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_CONDIDAT','ROLE_ADMIN','ROLE_Pro')")
    public User getCurrentUser(@CurrentUser User currentUser) {

        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
        return user;
    }

    @GetMapping("/users/{username}")
    public User getUserProfile(@PathVariable(value = "username") String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return user;
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

    @PutMapping("/users/edit")

    public ResponseEntity<?> updateuser(@RequestBody Pro_RegisterRequest request, @CurrentUser User user) {
        userService.updateuser(request, user.getId());
        return new ResponseEntity<>(new ApiResponse(true, "user modifié"), HttpStatus.OK);
    }

    @DeleteMapping("/users/delete")

    public ResponseEntity<?> deleteuser(@CurrentUser User user) {
        userRepository.deleteById(user.getId());
        return new ResponseEntity(new ApiResponse(true, "user supprimé"),
                HttpStatus.ACCEPTED);
    }
    @PostMapping("users/address/add")
    public ResponseEntity<?> ajouteradresse(@RequestBody AddressRequest request,@CurrentUser User user){
        userService.ajouteradresse(request,user.getId());
        return new ResponseEntity(new ApiResponse(true,"adresse ajouté"),HttpStatus.OK);
    }
    @PutMapping("users/address/edit")
    public ResponseEntity<?> modifieradresse(@RequestBody AddressRequest request,@CurrentUser User user){

    }
}
