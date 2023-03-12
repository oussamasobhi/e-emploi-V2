package com.example.eemploibackend.controller;


import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Professionel;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.ProRepository;

import com.example.eemploibackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
@PreAuthorize("hasAuthority('ROLE_STANDARD')")
public class UserController {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private ProRepository proRepository;
    @GetMapping("/user/me")
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_CONDIDAT','ROLE_ADMIN','ROLE_Pro')")
    public User getCurrentUser(@CurrentUser User currentUser) {

        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
        if(user.getRoleName().name().equals("ROLE_Pro")){
            Professionel professionel=proRepository.findByUsername(currentUser.getUsername());
            return professionel;
        }
        return user;
    }
    @GetMapping("/users/{username}")
    public User getUserProfile(@PathVariable(value = "username") String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        if(user.getRoleName().name().equals("ROLE_Pro")){
            Professionel professionel=proRepository.findByUsername(username);
            return professionel;
        }
        return user;
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