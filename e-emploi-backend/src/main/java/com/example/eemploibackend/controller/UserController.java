package com.example.eemploibackend.controller;


import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;

import com.example.eemploibackend.repository.AdresseRepository;
import com.example.eemploibackend.repository.UserRepository;
import com.example.eemploibackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    private final UserService userService;
    private final AdresseRepository adresseRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasAnyAuthority('ROLE_STANDARD','ROLE_CONDIDAT','ROLE_ADMIN','ROLE_Pro')")
    public UserSummary getCurrentUser(@CurrentUser User currentUser) {

        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
        UserSummary userSummary=userService.mapusertoSummary(user);
        return userSummary;
    }

    @GetMapping("/users/{username}")
    public UserSummary getUserProfile(@PathVariable(value = "username") String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        UserSummary userSummary=userService.mapusertoSummary(user);
        return userSummary;
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

    @PutMapping("users/edit")
    public ResponseEntity<?> updateuser(@RequestBody Pro_RegisterRequest request, @CurrentUser User user) {
        userService.updateuser(request, user.getId());
        return new ResponseEntity<>(new ApiResponse(true, "user modifié"), HttpStatus.OK);
    }

    @DeleteMapping("users/delete")
    public ResponseEntity<?> deleteuser(@CurrentUser User user) {
        userRepository.deleteById(user.getId());
        return new ResponseEntity(new ApiResponse(true, "user supprimé"),
                HttpStatus.ACCEPTED);
    }

    // reset password
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
}

