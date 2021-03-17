package com.p565sp21group1.patientmanagerspring.repositories;

import com.p565sp21group1.patientmanagerspring.models.Conversation;
import com.p565sp21group1.patientmanagerspring.models.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//NOTE: The table is named "T_Message" because "Message" is a reserved table

@Repository
public interface MessageRepository extends CrudRepository<Message, Long>
{
    @Query(value = "SELECT m FROM Message m " +
            "WHERE m.conversation.conversationId = :conversationId " +
            "ORDER BY m.id DESC")
    List<Message> getRecentMessages(long conversationId);
}
