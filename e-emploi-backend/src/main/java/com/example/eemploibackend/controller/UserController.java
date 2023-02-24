package com.example.eemploibackend.controller;

import com.example.eemploibackend.auth.RegisterRequest;
import com.example.eemploibackend.auth.tasker.Pro_AuthentificationService;
import com.example.eemploibackend.auth.tasker.Pro_RegisterRequest;
import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Professionel;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.ClientRepository;
import com.example.eemploibackend.repository.ProRepository;

import com.example.eemploibackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private ProRepository proRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private Pro_AuthentificationService service;

    @GetMapping("/user/me")
    @PreAuthorize("hasAnyAuthority('USER','GUEST')")
    public UserSummary getCurrentUser(@CurrentUser User currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
        return userSummary;
    }
    @GetMapping("/users/{username}")
    public Profil getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        if(user.getIsTasker()) {
            UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName());
        return userProfile;
        }
        GuestProfile guestProfile=new GuestProfile(user.getId(),user.getUsername(),user.getName());
        return guestProfile;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(
            @RequestParam(value = "username") String username){
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(
            @RequestParam(value = "email") String email){
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }
}
