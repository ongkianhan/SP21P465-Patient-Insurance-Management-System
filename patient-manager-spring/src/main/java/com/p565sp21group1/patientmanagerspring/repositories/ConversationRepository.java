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
    //Credit to https://stackoverflow.com/a/12110211 for the sub-query
    @Query("SELECT c from Conversation c WHERE EXISTS " +
            "(SELECT u from Conversation ce LEFT JOIN ce.usersInvolved u WHERE c = ce AND u.id = :userId)")
    List<Conversation> getConversationsByUserId(long userId);
}