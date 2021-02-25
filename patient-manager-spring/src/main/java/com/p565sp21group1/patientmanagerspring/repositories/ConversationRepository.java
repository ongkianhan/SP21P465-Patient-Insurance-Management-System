package com.p565sp21group1.patientmanagerspring.repositories;

import com.p565sp21group1.patientmanagerspring.models.Appointment;
import com.p565sp21group1.patientmanagerspring.models.Conversation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ConversationRepository extends CrudRepository<Conversation, Long>
{
    @Query("SELECT c FROM Conversation c")
    List<Conversation> getConversationsByUserId(long userId);
}