package com.example.eemploibackend.controller;

import com.example.eemploibackend.model.Message;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ApiResponse;
import com.example.eemploibackend.payloads.MessageRequest;
import com.example.eemploibackend.payloads.UserResponse;
import com.example.eemploibackend.services.ChatService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;
    @PreAuthorize("hasAnyAuthority('ROLE_Pro','ROLE_ADMIN','ROLE_STANDARD')")
    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getIdannonce(),"/private",message);
        return message;
    }
    @PreAuthorize("hasAnyAuthority('ROLE_Pro','ROLE_ADMIN','ROLE_STANDARD')")
    @PostMapping("/message/add")
    public ResponseEntity<?> addmessage(@RequestBody MessageRequest request){
            chatService.addmessage(request);
            return new ResponseEntity(new ApiResponse(true,"Message envoyé"), HttpStatus.OK);
    }
//    @GetMapping("/chat-users/{username}")
//    public List<UserResponse> getchatusersofausername(@PathVariable(value = "username")String username){
//        return chatService.getallchatusers(username);
//    }
@PreAuthorize("hasAnyAuthority('ROLE_Pro','ROLE_ADMIN','ROLE_STANDARD')")
@GetMapping("message/{username}/chat/{idannonce}/{username2}")
    public List<Message> getchatoftwousersbyannonce(@PathVariable(value = "username")String username,
                                           @PathVariable(value = "idannonce")String idannonce,
                                                    @PathVariable(value="username2")String username2){
            return chatService.getuserschatmessages(username,idannonce,username2);
    }
    @GetMapping("/chat-users/{idannonce}")
    public List<UserResponse> getchatusersbyannonce(@PathVariable(value = "idannonce")String idannonce){
        return chatService.getannonceSenders(idannonce);
    }

    @GetMapping("/chat-users/{username}")
    public List<String> getidannnocebyusername(@PathVariable(value = "username")String username){
        return chatService.getallidannoncebyusername(username);
    }
    @GetMapping("/chat-users/{idannonce}/{username}")
    public List<Message> getmessagebyidannonceandusername(@PathVariable(value = "idannonce")String idannonce,
                                                          @PathVariable(value = "username")String username){
        return chatService.getchatByusernameandIdannonce(idannonce,username);
    }
}
