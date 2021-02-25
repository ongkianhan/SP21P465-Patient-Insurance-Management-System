package com.p565sp21group1.patientmanagerspring.web;

import com.p565sp21group1.patientmanagerspring.models.Conversation;
import com.p565sp21group1.patientmanagerspring.services.ConversationService;
import com.p565sp21group1.patientmanagerspring.services.ErrorMapValidationService;
import com.p565sp21group1.patientmanagerspring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
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


    @PostMapping("/create-conversation/{userId1}&{userId2}")
    public ResponseEntity<?> createConversation(@Valid @RequestBody Conversation conversation,
                                               BindingResult result, @PathVariable String userId1, @PathVariable String userId2)
    {
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        long userId1Long = userService.parseLong(userId1);
        long userId2Long = userService.parseLong(userId2);
        Conversation newConversation = conversationService.createConversation(userId1Long, userId2Long, conversation);

        return new ResponseEntity<Conversation>(newConversation, HttpStatus.CREATED);
    }

    @GetMapping("/get/{userId}")
    public Iterable<Conversation> getConversationsByUserId(@PathVariable String userId)
    {
        long userIdLong = userService.parseLong(userId);
        return conversationService.getConversationsByUserId(userIdLong);
    }
}
