package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Message;
import com.example.eemploibackend.model.Status;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.MessageRequest;
import com.example.eemploibackend.repository.MessageRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    public void addmessage(MessageRequest request){
        User sender=userRepository.findByUsername(request.getSenderUsername()).orElseThrow();
        User receiver=userRepository.findByUsername(request.getReceiverUsername()).orElseThrow();
        Message message= Message.builder()
                .content(request.getContent())
                .status(Status.Envoyé)
                .createdAt(request.getCreatedAt())
                .sender(sender)
                .receiver(receiver)
                .build();
        messageRepository.save(message);
    }
}
