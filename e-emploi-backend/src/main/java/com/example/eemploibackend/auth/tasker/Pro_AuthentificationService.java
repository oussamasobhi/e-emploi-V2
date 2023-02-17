package com.example.eemploibackend.auth.tasker;

import com.example.eemploibackend.auth.AuthenticationRequest;
import com.example.eemploibackend.auth.RegisterRequest;
import com.example.eemploibackend.config.JwtService;
import com.example.eemploibackend.exceptions.AppException;
import com.example.eemploibackend.model.Professionel;
import com.example.eemploibackend.model.Role;
import com.example.eemploibackend.model.RoleName;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.JwtAuthenticationResponse;
import com.example.eemploibackend.repository.ProRepository;
import com.example.eemploibackend.repository.RoleRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
@Service
@RequiredArgsConstructor
public class Pro_AuthentificationService {
    private final UserRepository repository;
    private final ProRepository proRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> register(Pro_RegisterRequest request) {
        var professionel = Professionel.builder()
                .name(request.getName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .description(request.getDescription())
                .isTasker(true)
                .build();
        if(repository.existsByUsername(request.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }
        if(repository.existsByEmail(request.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new AppException("User Role not set."));

            professionel.setRoles(Collections.singleton(userRole));

        Professionel result=proRepository.save(professionel);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();
        var jwtToken = jwtService.generateToken(professionel);
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    public ResponseEntity<?> authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsernameOrEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsernameOrEmail(request.getUsernameOrEmail(),request.getUsernameOrEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwtToken));
    }
}
