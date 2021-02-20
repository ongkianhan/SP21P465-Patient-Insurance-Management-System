package com.p565sp21group1.patientmanagerspring.web;

import com.p565sp21group1.patientmanagerspring.models.User;
import com.p565sp21group1.patientmanagerspring.services.ErrorMapValidationService;
import com.p565sp21group1.patientmanagerspring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/account")
public class UserController
{
    @Autowired
    private UserService userService;

    @Autowired
    private ErrorMapValidationService errorMapValidationService;

    /**
     * Registers a new user to the database.
     * @param user the JSON data used to create a new account
     * @param result contains Spring validation errors
     * @return the new user as JSON or errors JSON
     */
    @PostMapping("")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result)
    {
        //Return errors if the annotations in User class cause them
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        User newUser = userService.saveOrUpdateUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
}
