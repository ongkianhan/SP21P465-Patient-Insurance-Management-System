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


    public Conversation createConversation(long userId1, long userId2, Conversation conversation)
    {
        try
        {
            //Pair the conversation with user 1...
            //Calling get() retrieves the actual User from the repos
            User user1 = (User) userRepository.findById(userId1).get();
            conversation.addUserInvolved(user1);

            //Pair the conversation with user 1...
            //Calling get() retrieves the actual User from the repos
            User user2 = (User) userRepository.findById(userId2).get();
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


    public Message addMessage(long conversationId, Message message)
    {
        //ProjectTasks to be added to a specific project, project != null, backlog != null
        Conversation conversation = conversationRepository.findById(conversationId).get();

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
