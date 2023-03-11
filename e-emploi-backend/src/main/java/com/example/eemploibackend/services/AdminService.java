package com.example.eemploibackend.services;

import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.AdminRequest;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public ResponseEntity<?> updateadmin(AdminRequest request, User user){

        return    userRepository.findById(user.getId()).map(
                admin ->
                {
                    if((userRepository.existsByEmail(request.getEmail()) && !request.getEmail().equals(user.getEmail())) ||
                            (userRepository.existsByUsername(request.getUsername())&& !request.getUsername().equals(user.getUsername()))){
                        return new ResponseEntity(new ApiResponse(false,
                                "username or email are already exist"), HttpStatus.BAD_REQUEST);
                    }
                    admin.setUsername(request.getUsername());
                    admin.setPassword(passwordEncoder.encode(request.getPassword()));
                    admin.setEmail(request.getEmail());
                    admin.setNom(request.getNom());
                    admin.setPrenom(request.getPrenom());
                    userRepository.save(admin);
                    return new ResponseEntity(new ApiResponse(true,
                            "admin bien modifiée"), HttpStatus.ACCEPTED);
                }        ).orElseThrow(()->new ResourceNotFoundException("USER","username",user.getId()));
    }
}
