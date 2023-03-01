package com.example.eemploibackend.controller;

import com.example.eemploibackend.auth.RegisterRequest;
import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.Client;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.ClientRepository;
import com.example.eemploibackend.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ROLE_GUEST')")
public class ClientController {
    private final ClientService clientService;
    private final ClientRepository clientRepository;


    @PutMapping("/profile/edit")

    public ResponseEntity<?> updateclient(@RequestBody RegisterRequest request,
                                          @CurrentUser Client clt) {
        return clientService.updateclient(request, clt);
    }

    @DeleteMapping("/profile/delete")
    public ResponseEntity<?> deleteclient(@CurrentUser Client clt) {
                      clientRepository.delete(clt);
                      return new ResponseEntity(new ApiResponse(true,"client supprimé"),
                              HttpStatus.ACCEPTED);
    }

}
