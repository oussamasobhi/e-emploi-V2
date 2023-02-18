package com.example.eemploibackend.services;

import com.example.eemploibackend.auth.RegisterRequest;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Client;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.ClientRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public ResponseEntity<?> updateclient(RegisterRequest request, Client clt){

      return    clientRepository.findById(clt.getId()).map(
                client ->
                {
                    if((userRepository.existsByEmail(request.getEmail()) && !request.getEmail().equals(clt.getEmail())) ||
                            (userRepository.existsByUsername(request.getUsername())&& !request.getUsername().equals(clt.getUsername()))){
                        return new ResponseEntity(new ApiResponse(false,
                                "username or email are already exist"), HttpStatus.BAD_REQUEST);
                    }
                    client.setUsername(request.getUsername());
                    client.setName(request.getName());
                    client.setPassword(passwordEncoder.encode(request.getPassword()));
                    client.setEmail(request.getEmail());
                    clientRepository.save(client);
                    return new ResponseEntity(new ApiResponse(true,
                            "client bien modifiée"), HttpStatus.ACCEPTED);
                }        ).orElseThrow(()->new ResourceNotFoundException("USER","username",clt.getId()));
    }
}
