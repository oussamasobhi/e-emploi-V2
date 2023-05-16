package com.example.eemploibackend.controller;

import com.example.eemploibackend.auth.AuthenticationRequest;
import com.example.eemploibackend.auth.AuthenticationService;
import com.example.eemploibackend.auth.RegisterRequest;
import com.example.eemploibackend.config.LogoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {
  private final AuthenticationService service;
    @PostMapping("/signup/pro")
    @ResponseBody
    public ResponseEntity<?> registerPRO(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request)).getBody();
    }
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
