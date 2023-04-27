package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Review;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ReviewRequest;
import com.example.eemploibackend.repository.ReviewRepository;
import com.example.eemploibackend.repository.TokenRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    public Boolean ajouterReview(ReviewRequest request,Long idreviewer){
        if(request.getRate()>5 || request.getRate()<0){
            return false;
        }
        User reviewer=userRepository.findUserById(idreviewer);
        User user=userRepository.findUserById(request.getIduser());
        Review review= Review.builder()
                .reviewer(reviewer)
                .avis(request.getAvis())
                .rate(request.getRate())
                .user(user)
                .build() ;
        reviewRepository.save(review);
        return true;
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
    public Double getratebyuser(Long iduser){
        if(userRepository.existsById(iduser)){
            List<Double> rates=reviewRepository.findratebyuser(iduser);
            Double globalrate=0d;
            for(Double i:rates){
                globalrate+=(i/rates.size());
            }
            return globalrate;
        }
        return -1d;
    }
}
