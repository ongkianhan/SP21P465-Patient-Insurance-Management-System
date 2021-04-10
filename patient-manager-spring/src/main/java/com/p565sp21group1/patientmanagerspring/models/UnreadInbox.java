package com.p565sp21group1.patientmanagerspring.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="UnreadInbox")
public class UnreadInbox
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long unreadInboxId;

    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY, mappedBy = "unreadInbox", orphanRemoval = true)
    private List<Message> unreadMessages = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", updatable = false, nullable = false)
    @JsonIgnore
    private User owner;

    public UnreadInbox() {
    }

    public Long getUnreadInboxId() {
        return unreadInboxId;
    }

    public void setUnreadInboxId(Long unreadInboxId) {
        this.unreadInboxId = unreadInboxId;
    }

    public List<Message> getUnreadMessages() {
        return unreadMessages;
    }

    public void setUnreadMessages(List<Message> unreadMessages) {
        this.unreadMessages = unreadMessages;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }


    public void addUnreadMessage(Message unreadMessage)
    {
        this.unreadMessages.add(unreadMessage);
    }

    public void deleteUnreadMessagesByConversationId(long conversationId)
    {
        //For each message in the unread inbox...
        for (int i=0; i < unreadMessages.size(); i++)
        {
            Message message = unreadMessages.get(i);
            //If the message's parent conversation matches the target ID, remove it from this unreadInbox
            if (message.getConversation().getConversationId() == conversationId)
            {
                unreadMessages.remove(message);
                i--;
            }
        }
    }
}
