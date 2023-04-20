package com.example.eemploibackend.repository;

import com.example.eemploibackend.model.Message;
import com.example.eemploibackend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
    @Query("SELECT DISTINCT M.receivername from Message M where M.sendername=?1 and M.receivername!=?1")
    List<String> getchatreceivers(String username);
    @Query("SELECT distinct M.sendername from Message M where M.receivername=?1 and M.sendername!=?1")
    List<String> getchatsenders(String username);
    @Query("SELECT M from Message M where (M.sendername=?1 and M.receivername=?2) or (M.sendername=?2 and M.receivername=?1) order by M.createdAt")
    List<Message> getchatmessages(String username,String other);
}
