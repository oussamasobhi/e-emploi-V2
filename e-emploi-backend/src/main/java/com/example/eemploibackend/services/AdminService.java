package com.example.eemploibackend.services;

import com.example.eemploibackend.exceptions.BadRequestException;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public PagedResponse<UserResponse> getAllusers(int page, int size) {
        validatePageNumberAndSize(page, size);
        // retrieve all users
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<User> users = userRepository.findAll(pageable);
        List<UserResponse> allusers=users.map((user)->{
            return ModelMapper.mapUserToUserResponse(user);})
                .getContent();

        return new PagedResponse<>(allusers, users.getNumber(),
                users.getSize(), users.getTotalElements(), users.getTotalPages(), users.isLast());
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > 50) {
            throw new BadRequestException("Page size must not be greater than " + 50);
        }
    }
}
