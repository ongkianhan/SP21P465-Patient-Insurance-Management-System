package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.models.*;
import com.p565sp21group1.patientmanagerspring.repositories.ConversationRepository;
import com.p565sp21group1.patientmanagerspring.repositories.MessageRepository;
import com.p565sp21group1.patientmanagerspring.repositories.UnreadInboxRepository;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConversationService
{
    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    UnreadInboxRepository unreadInboxRepository;


    public Conversation createConversation(long senderId, String otherUserEmail, Conversation conversation)
    {
        User user1, user2;
        try
        {
            //Pair the conversation with user 1...
            //Calling get() retrieves the actual User from the repos
            user1 = (User) userRepository.findById(senderId).get();
            conversation.addUserInvolved(user1);

            //Pair the conversation with user 1...
            //Calling get() retrieves the actual User from the repos
            user2 = (User) userRepository.findByEmail(otherUserEmail);
            if (user2 == null) throw new Exception();
            conversation.addUserInvolved(user2);
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("That user could not be found. Ensure their email address is correct.");
        }

        //Ensure user is not starting a conversation with themself
        if (user1.getUserId() == user2.getUserId())
        {
            throw new UserNotFoundException("You cannot start a conversation with yourself!");
        }

        return conversationRepository.save(conversation);
    }


    public Iterable<Conversation> getConversationsByUserId(long userId)
    {
        //Retrieve the conversations associated with this user from the database
        Iterable<Conversation> conversations = conversationRepository.getConversationsByUserId(userId);
        for (Conversation conv : conversations)
        {
            //Add the first/last names of each user in the conversation to the object
            conv.updateNamesInvolved(userId);
        }

        //Also, update each convo with the number of unread messages for that user
        List<Message> allUnreads = unreadInboxRepository.getUnreadMessagesByUserId(userId);
        for (Message unreadMessage : allUnreads)
        {
            long parentConversationId = unreadMessage.getConversation().getConversationId();
            //Find the target conversation in the user's conversation list
            for (Conversation conv : conversations)
            {
                if (conv.getConversationId() == parentConversationId)
                {
                    //Update the conversation with the number of unread messages for this user
                    conv.setConversationId(1 + conv.getConversationId());
                }
            }
        }

        return conversations;
    }

    public int getTotalNumberOfUnreadMessagesByUserId(long userId)
    {
        return unreadInboxRepository.getTotalNumberOfUnreadMessagesByUserId(userId);
    }


    public Message addMessage(long conversationId, long userId, Message message)
    {
        //Tell the message which conversation it belongs to
        Conversation conversation = conversationRepository.findById(conversationId).get();
        message.setConversation(conversation);

        //Tell the message who sent it
        User sender = userRepository.findById(userId).get();
        message.setSender(sender);

        //Also save the message to the unread inbox of every user in the conversation
        for (User userInvolved : conversation.getUsersInvolved())
        {
            //Add the message to the user's inbox
            userInvolved.getUnreadInbox().addUnreadMessage(message);
            unreadInboxRepository.save(userInvolved.getUnreadInbox());
        }

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
