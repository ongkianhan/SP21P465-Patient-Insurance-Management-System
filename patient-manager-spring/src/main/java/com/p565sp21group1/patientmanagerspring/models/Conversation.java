package com.p565sp21group1.patientmanagerspring.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Conversation")
public class Conversation
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conversationId;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "userId", nullable = false)
    @JsonIgnore //do not show all user JSON for each conversation
    private List<User> usersInvolved = new ArrayList<>();

    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "conversation", orphanRemoval = true)
    private List<Message> messages = new ArrayList<>();


    public Conversation() {
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public List<User> getUsersInvolved() {
        return usersInvolved;
    }

    public void setUsersInvolved(List<User> usersInvolved) {
        this.usersInvolved = usersInvolved;
    }

    public void addUserInvolved(User newUser) {
        if (usersInvolved == null) {
            usersInvolved = new ArrayList<>();
        }
        usersInvolved.add(newUser);
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}
