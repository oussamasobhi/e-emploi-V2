package com.example.eemploibackend.controller;

import com.example.eemploibackend.auth.AuthenticationRequest;
import com.example.eemploibackend.auth.AuthenticationService;
import com.example.eemploibackend.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {
  private final AuthenticationService service;
    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request)).getBody();
    }

    @PostMapping("/signin")
    @ResponseBody
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request)).getBody();
    }

}
