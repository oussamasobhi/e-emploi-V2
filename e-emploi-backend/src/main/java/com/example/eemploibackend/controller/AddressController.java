package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.AddressRequest;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.repository.AdresseRepository;
import com.example.eemploibackend.services.AddressService;
import com.example.eemploibackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;
    @PostMapping("/add")
    public ResponseEntity<?> ajouteradresse(@RequestBody AddressRequest request, @CurrentUser User user){
        addressService.ajouteradresse(request,user.getId());
        return new ResponseEntity(new ApiResponse(true,"adresse ajouté"), HttpStatus.OK);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> modifieradresse(@PathVariable(value="id") Long id ,@RequestBody AddressRequest request){
        addressService.modifieradresse(request,id);
        return new ResponseEntity(new ApiResponse(true,"adresse modifié"),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> supprimeradresse(@PathVariable(value="id") Long id){
        addressService.supprimeradresse(id);
        return new ResponseEntity(new ApiResponse(true,"adresse supprimé"),HttpStatus.OK);
    }
}
