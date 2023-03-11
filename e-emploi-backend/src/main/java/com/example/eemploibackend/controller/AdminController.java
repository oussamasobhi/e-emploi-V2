package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.AdminRequest;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.UserRepository;
import com.example.eemploibackend.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final UserRepository userRepository;
    @PutMapping("/profile/edit")

    public ResponseEntity<?> updateadmin(@RequestBody AdminRequest request,
                                       @CurrentUser User user) {
             return adminService.updateadmin(request,user);
    }

    @DeleteMapping("/profile/delete")
    public ResponseEntity<?> deleteadmin(@CurrentUser User user) {
        userRepository.delete(user);
        return new ResponseEntity(new ApiResponse(true,"admin supprimé"),
                HttpStatus.ACCEPTED);
    }
}
