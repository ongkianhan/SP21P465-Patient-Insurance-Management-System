package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.Insurer;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.models.User;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
public class PermissionService
{
    @Autowired
    private UserRepository userRepository;

    public boolean isDoctor(String email)
    {
        try
        {
            User user = userRepository.findByEmail(email);
            if (user != null) //TODO: check if user is a doctor
                return true;
            else
                return false;
        }
        catch (Exception ex) {
            return false; //user not found
        }
    }

    public boolean isPatient(String email)
    {
        try
        {
            User user = userRepository.findByEmail(email);
            if (user != null) //TODO: check if user is a patient
                return true;
            else
                return false;
        }
        catch (Exception ex) {
            throw new UserNotFoundException("User not be found.");
        }
    }

    public boolean isInsurer(String email)
    {
        try
        {
            User user = userRepository.findByEmail(email);
            if (user != null) //TODO: check if user is a insurer
                return true;
            else
                return false;
        }
        catch (Exception ex) {
            throw new UserNotFoundException("User not be found.");
        }
    }
}
