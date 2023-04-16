package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Review;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ReviewRequest;
import com.example.eemploibackend.repository.ReviewRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public void ajouterReview(ReviewRequest request,Long idreviewer){
        User reviewer=userRepository.findUserById(idreviewer);
        User user=userRepository.findUserById(request.getIduser());
        Review review= Review.builder()
                .reviewer(reviewer)
                .avis(request.getAvis())
                .rate(request.getRate())
                .user(user)
                .build() ;
        reviewRepository.save(review);
    }
    public void editreview(ReviewRequest request,Long idreview){
        Review review=reviewRepository.findById(idreview).orElseThrow();
        review.setAvis(request.getAvis());
        review.setRate(request.getRate());
        reviewRepository.save(review);
    }
    public void supprimerreview(Long idreview){
        reviewRepository.deleteById(idreview);
    }
}
