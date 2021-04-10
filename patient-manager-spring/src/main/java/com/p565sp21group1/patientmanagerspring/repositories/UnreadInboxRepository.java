package com.p565sp21group1.patientmanagerspring.repositories;

import com.p565sp21group1.patientmanagerspring.models.Conversation;
import com.p565sp21group1.patientmanagerspring.models.Message;
import com.p565sp21group1.patientmanagerspring.models.UnreadInbox;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UnreadInboxRepository extends CrudRepository<UnreadInbox, Long>
{
    //Credit to https://stackoverflow.com/a/12110211 for the sub-query
    @Query("SELECT i FROM UnreadInbox i WHERE i.owner.userId = :userId")
    List<Message> getUnreadMessagesByUserId(long userId);

    @Query("SELECT COUNT(i) FROM UnreadInbox i WHERE i.owner.userId = :userId")
    int getTotalNumberOfUnreadMessagesByUserId(long userId);

    @Query("SELECT i FROM UnreadInbox i WHERE " +
            "i.owner.userId = :userId")
    UnreadInbox getUnreadInboxByUserId(long userId);
}