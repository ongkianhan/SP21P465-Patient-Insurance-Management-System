package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UsernameTakenException;
import com.p565sp21group1.patientmanagerspring.models.User;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;

    public User saveOrUpdateUser(User user)
    {
        try 
        {
            //Create the user on the database
            return userRepository.save(user);
        }
        catch (Exception ex)
        {
            //Show an error if the username is taken
            throw new UsernameTakenException(
                    "The username '"+user.getUsername()+"' is taken. Great minds truly do think alike. ");
        }
    }
}
