package com.p565sp21group1.patientmanagerspring.web;

import com.p565sp21group1.patientmanagerspring.models.Conversation;
import com.p565sp21group1.patientmanagerspring.models.Message;
import com.p565sp21group1.patientmanagerspring.services.ConversationService;
import com.p565sp21group1.patientmanagerspring.services.ErrorMapValidationService;
import com.p565sp21group1.patientmanagerspring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController
{
    @Autowired
    private UserService userService;

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private ErrorMapValidationService errorMapValidationService;


    @GetMapping("/view/{conversationId}") //TODO rename
    public Iterable<Message> getProjectBacklog(@PathVariable String conversationId)
    {
        long conversationIdLong = userService.parseUserId(conversationId);
        return conversationService.getRecentMessages(conversationIdLong);
    }

    @PostMapping("/user-{userId}/{conversationId}")
    public ResponseEntity<?> addMessageToConversation(@Valid @RequestBody Message message,
                                                      BindingResult result,
                                                      @PathVariable String conversationId,
                                                      @PathVariable String userId)
    {
        //Return an error if the message was blank
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        //Create the message on the database
        long conversationIdLong = userService.parseUserId(conversationId);
        long userIdLong = userService.parseUserId(userId);
        Message message1 = conversationService.addMessage(conversationIdLong, userIdLong, message);

        return new ResponseEntity<Message>(message1, HttpStatus.CREATED);
    }

    @PostMapping("/create-conversation/{userId1}&{userId2}")
    public ResponseEntity<?> createConversation(@Valid @RequestBody Conversation conversation,
                                               BindingResult result, @PathVariable String userId1, @PathVariable String userId2)
    {
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        long userId1Long = userService.parseUserId(userId1);
        long userId2Long = userService.parseUserId(userId2);
        Conversation newConversation = conversationService.createConversation(userId1Long, userId2Long, conversation);

        return new ResponseEntity<Conversation>(newConversation, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-user/{userId}")
    public Iterable<Conversation> getConversationsByUserId(@PathVariable String userId)
    {
        long userIdLong = userService.parseUserId(userId);
        return conversationService.getConversationsByUserId(userIdLong);
    }
}
