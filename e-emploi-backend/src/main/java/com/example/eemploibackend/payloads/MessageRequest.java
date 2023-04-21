package com.example.eemploibackend.payloads;

import com.example.eemploibackend.model.Status;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;

@Data
@Builder
public class MessageRequest {
    private String sendername;
    private String receivername;
    private String  idannonce;
    private String content;
    @CreatedDate
    private Instant createdAt;
    private Status status;
}
