package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.models.*;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.stereotype.Service;
import com.p565sp21group1.patientmanagerspring.repositories.InsurancePackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;


import java.security.Principal;
import java.util.*;

@Service
public class InsurancePackageService
{
    @Autowired
    private InsurancePackageRepository insurancePackageRepository;

    @Autowired
    private UserRepository userRepository;


    public List<InsurancePackage> getInsurancePackagesByInsurerId(long insurerId, String username)
    {
        return new ArrayList<InsurancePackage>(); //TODO
    }

    public List<InsurancePackage> getInsurancePackagesByPatientId(long patientId, String username)
    {
        return new ArrayList<InsurancePackage>(); //TODO
    }

    public void createInsurancePackage(long insurerId, InsurancePackage insurancePackage, String username)
    {
        try
        {
            /*/Pair the appointment with the patient...
            //Calling get() retrieves the actual User from the repos
            Insurer insurer = (Insurer) userRepository.findByEmail(username);
            insurer.addInsurancePackage(insurancePackage);

            //Pair the appointment with the doctor...
            //Calling get() retrieves the actual User from the repos
            Doctor doctor = (Doctor) userRepository.findById(doctorId).get();
            appointment.setDoctor(doctor);

            return appointmentRepository.save(appointment);*/
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("The insurer could not be found.");
        }
    }
}
