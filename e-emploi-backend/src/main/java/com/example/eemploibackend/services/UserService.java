package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Role;
import com.example.eemploibackend.payloads.Pro_RegisterRequest;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.RoleName;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public void updateuser(Pro_RegisterRequest request, Long iduser){

            userRepository.findById(iduser).map(
                USER ->
                {
                    if((userRepository.existsByEmail(request.getEmail()) && !request.getEmail().equals(request.getEmail())) ||
                            (userRepository.existsByUsername(request.getUsername())&& !request.getUsername().equals(request.getUsername()))){
                        return new ResponseEntity(new ApiResponse(false,
                                "username or email are already exist"), HttpStatus.BAD_REQUEST);
                    }
                    Boolean isafieldnull=false;
                         if(request.getNom()==null || request.getPrenom()==null ||
                            request.getUsername()==null|| request.getEmail()==null ||
                            request.getCIN()==null || request.getDate_naissance()==null||
                            request.getNum_tel()==null)
                             isafieldnull=true;
                             USER.setNom(request.getNom());
                             USER.setPrenom(request.getPrenom());
                             USER.setUsername(request.getUsername());
                             USER.setPassword(request.getPassword());
                             USER.setEmail(request.getEmail());
                             USER.setCIN(request.getCIN());
                             USER.setDate_naissance(request.getDate_naissance());
                             USER.setPhoto_profil(request.getImage());
                             USER.setNum_tel(request.getNum_tel());


             if(!isafieldnull) {
               Role role= Role.builder()
                       .name(RoleName.ROLE_CONDIDAT)
                       .build();
                 USER.setRole(role);
             }
             userRepository.save(USER);
                    return new ResponseEntity(new ApiResponse(true,
                            "utilisateur modifie bien modifiée"), HttpStatus.ACCEPTED);
                }        );
    }
}
