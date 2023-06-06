package com.example.eemploibackend.services;

import com.example.eemploibackend.model.Message;
import com.example.eemploibackend.model.Status;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.MessageRequest;
import com.example.eemploibackend.payloads.ModelMapper;
import com.example.eemploibackend.payloads.UserResponse;
import com.example.eemploibackend.repository.MessageRepository;
import com.example.eemploibackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    public void addmessage(MessageRequest request){
//        User sender=userRepository.findByUsername(request.getSenderUsername()).orElseThrow();
//        User receiver=userRepository.findByUsername(request.getReceiverUsername()).orElseThrow();
        Message message= Message.builder()
                .content(request.getContent())
                .status(Status.Envoyé)
                .createdAt(request.getCreatedAt())
                .sendername(request.getSendername())
                .receivername(request.getReceivername())
                .idannonce(request.getIdannonce())
                .build();
        messageRepository.save(message);
    }
    public List<UserResponse> getallchatusers(String username){
        // id annonces
        List<String> receivers=messageRepository.getchatreceivers(username);
        List<String> senders=messageRepository.getchatsenders(username);
       Set<UserResponse> chatusers=new HashSet<>();
        for(String i:receivers){
           chatusers.add(mapusernametouserrespnse(i));
       }
        for(String i:senders){
            chatusers.add(mapusernametouserrespnse(i));
        }
        return chatusers.stream().toList();
    }
    private UserResponse mapusernametouserrespnse(String username){
        return ModelMapper.mapUserToUserResponse(userRepository.findByUsername(username).orElseThrow());
    }
    // Pour le chat entre deux utilisateurs
    public List<Message> getuserschatmessages(String username,String idannonce, String username2){
        return messageRepository.getchatmessages(username,idannonce,username2);
    }
    public List<UserResponse> getannonceSenders(String idannonce){
        List<String> sendernames=messageRepository.getsendersbyidannonce(idannonce);
        List<UserResponse> senders=new ArrayList<>();
        for(String s:sendernames){
            senders.add(mapusernametouserrespnse(s));
        }
        return senders;
    }
    // tirer tous les id annonce par username
    public List<String> getallidannoncebyusername(String username){
        List<String> receivers=messageRepository.getchatreceivers(username);
        List<String> senders=messageRepository.getchatsenders(username);
        Set<String> allids=new HashSet<>();
        for(String i:receivers)
            allids.add(i);
        for (String i:senders)
            allids.add(i);
        return allids.stream().toList();
    }

    // get all messages by idannonce and user pour l'afficher dans la barre de tous les annonces
    public List<Message> getchatByusernameandIdannonce(String idannonce,String username){
        return messageRepository.getmessageByidannonceanduser(username,idannonce);
    }
}
