package com.p565sp21group1.patientmanagerspring.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Transient
    private List<String> namesInvolved = new ArrayList<>();

    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "conversation", orphanRemoval = true)
    private List<Message> messages = new ArrayList<>();

    @Transient
    private int numberUnread = 0;


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

    public List<String> getNamesInvolved() {
        return namesInvolved;
    }

    public void setNamesInvolved(List<String> namesInvolved) {
        this.namesInvolved = namesInvolved;
    }

    public int getNumberUnread() {
        return numberUnread;
    }

    public void setNumberUnread(int numberUnread) {
        this.numberUnread = numberUnread;
    }


    public void updateNamesInvolved(long userIdToExclude) {
        //Add a list of the first+last names of each user involved
        //in this conversation to this object
        this.namesInvolved = new ArrayList<String>();
        for (User user : usersInvolved)
        {
            if (user.getUserId() != userIdToExclude) //do not include the user accessing the object
                this.namesInvolved.add(user.getFirstName() + " " + user.getLastName());
        }
    }
}
