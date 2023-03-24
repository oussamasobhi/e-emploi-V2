package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.Societe;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.AddressRequest;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.SocieteRequest;
import com.example.eemploibackend.repository.AdresseSocietyRepository;
import com.example.eemploibackend.repository.SocieteRepository;
import com.example.eemploibackend.services.SocieteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("societe")
public class SocieteController {
  private final SocieteRepository societeRepository;
  private final AdresseSocietyRepository adresseSocietyRepository;
private final SocieteService societeService;
  @GetMapping("/")
    public Societe getusersociete(@CurrentUser User user){
      return societeRepository.findSocieteByUserId(user.getId());
  }
  @PutMapping("/{id}/edit")
  public ResponseEntity<?> updatesociete(@RequestBody SocieteRequest societe,
                                         @PathVariable(value="id") Long id){
           societeService.editsociete(societe,id);
    return new ResponseEntity(new ApiResponse(true, "societe modifié"),
            HttpStatus.ACCEPTED);
  }
  @PostMapping("/create")
  public ResponseEntity<?> createsociete(@CurrentUser User user,@RequestBody SocieteRequest societe){
        societeService.createsociete(societe,user);
    return new ResponseEntity(new ApiResponse(true, "societe ajouté"),
            HttpStatus.ACCEPTED);
  }
  @DeleteMapping("/{id}/delete")
  public ResponseEntity<?> deletesociete(@PathVariable(value = "id") Long id){
        societeRepository.deleteById(id);
    return new ResponseEntity(new ApiResponse(true, "societe supprimé"),
            HttpStatus.ACCEPTED);
  }
  // crud on society addresses
  @DeleteMapping("/{id}/address/delete")
  public ResponseEntity<?> deletesocietyaddress(@PathVariable(value="id")Long id){
    adresseSocietyRepository.deleteById(id);
    return new ResponseEntity(new ApiResponse(true, "adresse societe supprimé"),
            HttpStatus.ACCEPTED);
  }
  @PutMapping("/{id}/address/edit")
  public ResponseEntity<?> updateaddressSociety(@PathVariable(value = "id")Long id,
                                                @RequestBody AddressRequest request){
    societeService.updateAdresseSociete(request,id);
    return new ResponseEntity(new ApiResponse(true, "adresse societe modifiéé"),
            HttpStatus.ACCEPTED);
  }
  @PostMapping("/{id}/address/create")
  public ResponseEntity<?> createadresssociety(@RequestBody AddressRequest request,
                                               @PathVariable(value = "id")Long id){
    societeService.createadresssociety(request,id);
    return new ResponseEntity(new ApiResponse(true, "adresse societe ajouté"),
            HttpStatus.ACCEPTED);
  }
}
