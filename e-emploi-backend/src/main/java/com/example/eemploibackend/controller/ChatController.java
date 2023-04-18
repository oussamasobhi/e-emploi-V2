package com.example.eemploibackend.controller;

import com.example.eemploibackend.model.Message;
import com.example.eemploibackend.payloads.MessageRequest;
import com.example.eemploibackend.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;
    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiver().getUsername(),"/private",message);
        return message;
    }
    @PostMapping("/message/add")
    public void addmessage(@RequestBody MessageRequest request){
            chatService.addmessage(request);
    }
}
