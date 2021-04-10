package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.exceptions.EmailTakenException;
import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.UnreadInbox;
import com.p565sp21group1.patientmanagerspring.models.User;
import com.p565sp21group1.patientmanagerspring.payload.DoctorSearchRequest;
import com.p565sp21group1.patientmanagerspring.repositories.UnreadInboxRepository;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UnreadInboxRepository unreadInboxRepository;

    /**
     * Converts a URL parameter to a long
     */
    public long parseUserId(String id)
    {
        try
        {
            return Long.parseLong(id);
        }
        catch (NumberFormatException ex)
        {
            throw new UserNotFoundException("Invalid ID");
        }
    }


    public User saveOrUpdateUser(User user)
    {
        try
        {
            //Check if the user already exists
            if (user.getUserId() != null) //Existing user
            {
                //Retrieve the old user data from the database
                User oldUserData = userRepository.findById(user.getUserId()).get();
                //Use the old password again
                user.setPassword(oldUserData.getPassword());
            }
            else //New user
            {
                //Encode the password
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                //Create an unread inbox
                unreadInboxRepository.save(new UnreadInbox());
            }

            //Throw error if username taken
            user.setUsername(user.getUsername());

            //Save the user
            return userRepository.save(user);
        }
        catch (Exception ex)
        {
            //Show an error if the username is taken
            throw new EmailTakenException(
                    "The email '" + user.getEmail() + "' is already registered");
        }
    }

    public Iterable<Doctor> getAllDoctors()
    {
        return userRepository.getAllDoctors();
    }

    public User findUserById(long id)
    {
        try
        {
            return userRepository.findById(id).get();
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("User with ID '"+id+"' not found");
        }
    }

    public Iterable<Doctor> getDoctorsByFilter(DoctorSearchRequest filter)
    {
        return userRepository.getDoctorsByFilter(filter);
    }

    public Iterable<String> getAllSpecializations()
    {
        return userRepository.getAllSpecializations();
    }
}
