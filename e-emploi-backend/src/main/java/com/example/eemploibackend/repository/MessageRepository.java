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
    @Query("SELECT DISTINCT M.idannonce from Message M where M.sendername=?1 and M.receivername!=?1")
    List<String> getchatreceivers(String username);
    @Query("SELECT distinct M.idannonce from Message M where M.receivername=?1 and M.sendername!=?1")
    List<String> getchatsenders(String username);
    @Query("SELECT M from Message M where (M.sendername=?1 and M.receivername=?3 and M.idannonce=?2) or (M.idannonce=?2 and M.sendername=?3 and M.receivername=?1) order by M.createdAt")
    List<Message> getchatmessages(String username,String idannonce,String username2);
    @Query("SELECT DISTINCT M.sendername FROM Message M where M.idannonce=?1")
    List<String> getsendersbyidannonce(String idannonce);
    @Query("select distinct M from Message M where M.sendername=?1 and M.idannonce=?2")
    List<Message> getmessageByidannonceanduser(String username,String idannonce);
}
