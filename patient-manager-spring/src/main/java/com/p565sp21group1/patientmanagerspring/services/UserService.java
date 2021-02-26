package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.exceptions.UsernameTakenException;
import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.Insurer;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.models.User;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;

    /*@Autowired //TODO: Un-comment when Spring Security is added
    private BCryptPasswordEncoder bCryptPasswordEncoder;*/

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
            //Encode the password
            //user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            //user.setConfirmPassword("");
            //Create the user on the database
            return userRepository.save(user);
        }
        catch (Exception ex)
        {
            //Show an error if the username is taken
            throw new UsernameTakenException(
                    "The username '" + user.getUsername() + "' is taken. Great minds truly do think alike. ");
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

    public Iterable<Doctor> filterDoctors()
    {
        //TODO
        return new ArrayList<Doctor>();
    }
}
