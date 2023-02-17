package com.example.eemploibackend.auth;

import com.example.eemploibackend.config.JwtService;
import com.example.eemploibackend.exceptions.AppException;
import com.example.eemploibackend.model.Client;
import com.example.eemploibackend.model.Role;
import com.example.eemploibackend.model.RoleName;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.JwtAuthenticationResponse;
import com.example.eemploibackend.repository.ClientRepository;
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
public class AuthenticationService {
    private final UserRepository repository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> register(RegisterRequest request) {
        var client = Client.builder()
                .name(request.getName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .isTasker(false)
                .build();
        if(repository.existsByUsername(request.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }
        if(repository.existsByEmail(request.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

            Role userRole = roleRepository.findByName(RoleName.ROLE_GUEST)
                    .orElseThrow(() -> new AppException("User Role not set."));

            client.setRoles(Collections.singleton(userRole));

        Client result=clientRepository.save(client);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();
        var jwtToken = jwtService.generateToken(client);
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
