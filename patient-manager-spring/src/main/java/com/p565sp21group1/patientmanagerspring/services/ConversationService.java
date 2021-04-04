package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.models.*;
import com.p565sp21group1.patientmanagerspring.repositories.ConversationRepository;
import com.p565sp21group1.patientmanagerspring.repositories.MessageRepository;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ConversationService
{
    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;


    public Conversation createConversation(long senderId, String otherUserEmail, Conversation conversation)
    {
        try
        {
            //Pair the conversation with user 1...
            //Calling get() retrieves the actual User from the repos
            User user1 = (User) userRepository.findById(senderId).get();
            conversation.addUserInvolved(user1);

            //Pair the conversation with user 1...
            //Calling get() retrieves the actual User from the repos
            User user2 = (User) userRepository.findByEmail(otherUserEmail);
            conversation.addUserInvolved(user2);

            return conversationRepository.save(conversation);
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("One of the users could not be found.");
        }
    }


    public Iterable<Conversation> getConversationsByUserId(long userId)
    {
        return conversationRepository.getConversationsByUserId(userId);
    }


    public Message addMessage(long conversationId, long userId, Message message)
    {
        //Tell the message which conversation it belongs to
        Conversation conversation = conversationRepository.findById(conversationId).get();
        message.setConversation(conversation);

        //Tell the message who sent it
        User sender = userRepository.findById(userId).get();
        message.setSender(sender);

        //TODO also save it to an Inbox table

        return messageRepository.save(message);
    }

    public Iterable<Message> getRecentMessages(long conversationId)
    {
        try
        {
            return messageRepository.getRecentMessages(conversationId);
        }
        catch (Exception ex)
        {
            System.out.println("Unknown conversation with id "+conversationId);
            return new ArrayList<Message>();
        }
    }
}
