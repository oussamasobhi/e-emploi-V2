package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.UserRepository;
import com.example.eemploibackend.services.AdminService;
import com.example.eemploibackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final UserRepository userRepository;
    private final UserService userService;
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
    // CRUD ON USERS
    @GetMapping("/users")
    public PagedResponse<UserResponse> getAllusers(@RequestParam(value = "page", defaultValue ="0") int page,
                                                   @RequestParam(value = "size", defaultValue = "30") int size){

                return adminService.getAllusers(page, size);
    }
    @PutMapping("/users/edit")
    public ResponseEntity<?> updateuser(@RequestBody Pro_RegisterRequest request, @CurrentUser User user){
        userService.updateuser(request,user.getId());
        return new ResponseEntity<>(new ApiResponse(true,"user modifié"), HttpStatus.OK);
    }
@DeleteMapping("/users/delete")
    public ResponseEntity<?> deleteuser(Long id){
        userRepository.deleteById(id);
    return new ResponseEntity(new ApiResponse(true,"user supprimé"),
            HttpStatus.ACCEPTED);
}
}
