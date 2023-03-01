package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.exceptions.AppException;
import com.example.eemploibackend.exceptions.ResourceNotFoundException;
import com.example.eemploibackend.model.Professionel;
import com.example.eemploibackend.model.Review;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.ReviewRequest;
import com.example.eemploibackend.repository.ProRepository;
import com.example.eemploibackend.repository.ReviewRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProRepository proRepository;

    // Get a review by ID
    @GetMapping("reviews/{id}")
    public Review getReview(@PathVariable Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("id","id",id));
    }

    // Create a new review for a user
    @PostMapping("/{username}/reviews/new")
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest reviewRequest, @PathVariable String username,
                                       @CurrentUser User currentuser) {
         Professionel pro=proRepository.findByUsername(username);
        if(pro==null)
           return new ResponseEntity(new ApiResponse(false, "cant give review to a client!"),
                    HttpStatus.BAD_REQUEST);
       Review review= Review.builder()
               .avis(reviewRequest.getAvis())
               .rate(reviewRequest.getRate())
               .professionel(pro)
               .user(currentuser)
               .build();
                reviewRepository.save(review);
                return ResponseEntity.ok()
                        .body(new ApiResponse(true,"review added succesfully"));
    }

    // Update a review
    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review newReview) {
        return reviewRepository.findById(id)
                .map(review -> {
                    review.setRate(newReview.getRate());
                    review.setAvis(newReview.getAvis());
                    return reviewRepository.save(review);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Review","review","id"));
    }

    // Delete a review
    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewRepository.deleteById(id);
    }

    // Exception handler for ReviewNotFoundException
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleReviewNotFound(ResourceNotFoundException e) {
        return e.getMessage();
    }

    // Exception handler for UserNotFoundException
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleUserNotFound(ResourceNotFoundException e) {
        return e.getMessage();
    }
}
