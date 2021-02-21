package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UsernameTakenException;
import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.Insurer;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public Doctor saveOrUpdateDoctor(Doctor doctor)
    {
        try
        {
            //Create the user on the database
            return userRepository.save(doctor);
        }
        catch (Exception ex)
        {
            //Show an error if the username is taken
            throw new UsernameTakenException(
                    "The username '" + doctor.getUsername() + "' is taken. Great minds truly do think alike. ");
        }
    }

    public Patient saveOrUpdatePatient(Patient patient)
    {
        try
        {
            //Create the user on the database
            return userRepository.save(patient);
        }
        catch (Exception ex)
        {
            //Show an error if the username is taken
            throw new UsernameTakenException(
                    "The username '" + patient.getUsername() + "' is taken. Great minds truly do think alike. ");
        }
    }

    public Insurer saveOrUpdateInsurer(Insurer insurer)
    {
        try
        {
            //Create the user on the database
            return userRepository.save(insurer);
        }
        catch (Exception ex)
        {
            //Show an error if the username is taken
            throw new UsernameTakenException(
                    "The username '" + insurer.getUsername() + "' is taken. Great minds truly do think alike. ");
        }
    }

    public Iterable<Doctor> getAllDoctors()
    {
        return userRepository.getAllDoctors();
    }
}
