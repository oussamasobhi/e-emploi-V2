package com.example.eemploibackend.controller;

import com.example.eemploibackend.model.Message;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.MessageRequest;
import com.example.eemploibackend.payloads.UserResponse;
import com.example.eemploibackend.services.ChatService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;
    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceivername(),"/private",message);
        return message;
    }
    @PostMapping("/message/add")
    public void addmessage(@RequestBody MessageRequest request){
            chatService.addmessage(request);
    }
    @GetMapping("/chat-users/{username}")
    public List<UserResponse> getchatusersofausername(@PathVariable(value = "username")String username){
        return chatService.getallchatusers(username);
    }
    @GetMapping("message/{username}/chat/{other}")
    public List<Message> getchatoftwousers(@PathVariable(value = "username")String username,
                                           @PathVariable(value = "other")String other){
            return chatService.getuserschatmessages(username,other);
    }
}
