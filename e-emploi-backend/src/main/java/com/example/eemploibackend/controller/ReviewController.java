package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.Review;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.ReviewRequest;
import com.example.eemploibackend.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewController {
    private final ReviewService reviewService;
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD')")
    @PostMapping("/add")
    public ResponseEntity<?> ajouterreview(@RequestBody ReviewRequest request,
                                           @CurrentUser User user){
       if(reviewService.ajouterReview(request,user.getId()))
        return new ResponseEntity(new ApiResponse(true, "review ajouté"),
                HttpStatus.ACCEPTED);
        return new ResponseEntity(new ApiResponse(false, "faut specifier un rate entre 0 et 5"),
                HttpStatus.BAD_REQUEST);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD')")
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editreview(@PathVariable(value = "id") Long id,
                                        @RequestBody ReviewRequest request){
        reviewService.editreview(request,id);
        return new ResponseEntity(new ApiResponse(true, "review modifié"),
                HttpStatus.ACCEPTED);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletereview(@PathVariable(value = "id")Long id){
        reviewService.supprimerreview(id);
        return new ResponseEntity(new ApiResponse(true, "review suprimé"),
                HttpStatus.ACCEPTED);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_STANDARD','ROLE_Pro')")
    @GetMapping("/{iduser}")
    public Double getratebyuser(@PathVariable(value = "iduser")Long iduser){
        double rate=reviewService.getratebyuser(iduser);
        if(rate>0)
            return rate;
        return -1d;
    }
}
