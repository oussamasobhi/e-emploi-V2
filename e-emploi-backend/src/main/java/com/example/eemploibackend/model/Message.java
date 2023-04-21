package com.example.eemploibackend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @ManyToOne
//    @JoinColumn(name = "id_sender", nullable = false)
//    private User sender;
//    @ManyToOne
//    @JoinColumn(name = "id_receiver", nullable = false)
//    private User receiver;
    private String sendername;
    private String receivername;
    private String idannonce;
    private String content;
    @CreatedDate
    private Instant createdAt;
    private Status status;
}
