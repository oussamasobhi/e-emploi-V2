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
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewController {
    private final ReviewService reviewService;
    @PostMapping("/add")
    public ResponseEntity<?> ajouterreview(@RequestBody ReviewRequest request,
                                           @CurrentUser User user){
        reviewService.ajouterReview(request,user.getId());
        return new ResponseEntity(new ApiResponse(true, "review ajouté"),
                HttpStatus.ACCEPTED);
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editreview(@PathVariable(value = "id") Long id,
                                        @RequestBody ReviewRequest request){
        reviewService.editreview(request,id);
        return new ResponseEntity(new ApiResponse(true, "review modifié"),
                HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletereview(@PathVariable(value = "id")Long id){
        reviewService.supprimerreview(id);
        return new ResponseEntity(new ApiResponse(true, "review suprimé"),
                HttpStatus.ACCEPTED);
    }
}
