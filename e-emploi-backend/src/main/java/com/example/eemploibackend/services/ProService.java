package com.example.eemploibackend.services;

import com.example.eemploibackend.auth.RegisterRequest;
import com.example.eemploibackend.auth.tasker.Pro_RegisterRequest;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Client;
import com.example.eemploibackend.model.Professionel;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.ClientRepository;
import com.example.eemploibackend.repository.ProRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProService {
    private final ProRepository proRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public ResponseEntity<?> updatepro(Pro_RegisterRequest request, Professionel pro){

        return    proRepository.findById(pro.getId()).map(
                professionel ->
                {
                    if((userRepository.existsByEmail(request.getEmail()) && !request.getEmail().equals(pro.getEmail())) ||
                            (userRepository.existsByUsername(request.getUsername())&& !request.getUsername().equals(pro.getUsername()))){
                        return new ResponseEntity(new ApiResponse(false,
                                "username or email are already exist"), HttpStatus.BAD_REQUEST);
                    }
                    professionel.setUsername(request.getUsername());
                    professionel.setPassword(passwordEncoder.encode(request.getPassword()));
                    professionel.setEmail(request.getEmail());
                    professionel.setName(request.getName());
                    professionel.setDescription(request.getDescription());
                    proRepository.save(professionel);
                    return new ResponseEntity(new ApiResponse(true,
                            "professionel bien modifiée"), HttpStatus.ACCEPTED);
                }        ).orElseThrow(()->new ResourceNotFoundException("USER","username",pro.getId()));
    }
}
