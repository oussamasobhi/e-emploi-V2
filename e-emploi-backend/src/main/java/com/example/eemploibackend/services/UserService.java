package com.example.eemploibackend.services;

import com.example.eemploibackend.payloads.Pro_RegisterRequest;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Professionel;
import com.example.eemploibackend.model.RoleName;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.ProRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final ProRepository proRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public ResponseEntity<?> updateuser(Pro_RegisterRequest request, User user){

        return    userRepository.findById(user.getId()).map(
                Pro ->
                {
                    if((userRepository.existsByEmail(request.getEmail()) && !request.getEmail().equals(user.getEmail())) ||
                            (userRepository.existsByUsername(request.getUsername())&& !request.getUsername().equals(user.getUsername()))){
                        return new ResponseEntity(new ApiResponse(false,
                                "username or email are already exist"), HttpStatus.BAD_REQUEST);
                    }
                    Professionel pr= Professionel.builder()
                            .nom(user.getNom())
                            .prenom(user.getPrenom())
                            .username(user.getUsername())
                            .password(user.getPassword())
                            .email(user.getEmail())
                            .CIN(request.getCIN())
                            .date_naissance(request.getDate_naissance())
                            .photo_profil(request.getImage())
                            .roleName(RoleName.ROLE_CONDIDAT)
                            .num_tel(request.getNum_tel())
                            .build();
                    userRepository.delete(user);
                    proRepository.save(pr);
                    return new ResponseEntity(new ApiResponse(true,
                            "professionel bien modifiée"), HttpStatus.ACCEPTED);
                }        ).orElseThrow(()->new ResourceNotFoundException("USER","username",user.getId()));
    }
}
