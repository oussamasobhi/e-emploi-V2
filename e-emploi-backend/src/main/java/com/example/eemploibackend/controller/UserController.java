package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.GuestProfile;
import com.example.eemploibackend.payloads.Profil;
import com.example.eemploibackend.payloads.UserProfile;
import com.example.eemploibackend.payloads.UserSummary;
import com.example.eemploibackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    @Autowired
    private  UserRepository userRepository;

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

}
