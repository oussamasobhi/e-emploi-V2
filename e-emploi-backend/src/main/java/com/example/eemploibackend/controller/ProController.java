package com.example.eemploibackend.controller;

import com.example.eemploibackend.auth.RegisterRequest;
import com.example.eemploibackend.auth.tasker.Pro_RegisterRequest;
import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.Client;
import com.example.eemploibackend.model.Professionel;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.ProRepository;
import com.example.eemploibackend.services.ProService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pro")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ROLE_USER')")
public class ProController {
    private final ProRepository proRepository;
    private final ProService proService;
    @PutMapping("/profile/edit")

    public ResponseEntity<?> updatepro(@RequestBody Pro_RegisterRequest request,
                                       @CurrentUser Professionel pro) {
        return proService.updatepro(request,pro);
    }

    @DeleteMapping("/profile/delete")
    public ResponseEntity<?> deletepro(@CurrentUser Professionel pro) {
        proRepository.delete(pro);
        return new ResponseEntity(new ApiResponse(true,"professionel supprimé"),
                HttpStatus.ACCEPTED);
    }
}
