package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.InsurancePackageAlreadyHeldException;
import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.models.*;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
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
        return insurancePackageRepository.getInsurancePackagesByInsurerId(insurerId);
    }

    public List<InsurancePackage> getInsurancePackagesByPatientId(long patientId, String username)
    {
        return insurancePackageRepository.getInsurancePackagesByPatientId(patientId);
    }

    public InsurancePackage createInsurancePackage(InsurancePackage insurancePackage, String username)
    {
        try
        {
            //Pair the package with the insurer...
            Insurer insurer = (Insurer) userRepository.findByEmail(username);
            insurancePackage.setInsurer(insurer);

            //Set the firm name to the insurer's firm
            insurancePackage.setFirmName(insurer.getFirmName());

            return insurancePackageRepository.save(insurancePackage);
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("The insurer could not be found.");
        }
    }

    public InsurancePackage addInsurancePackageToPatient(long packageId, String username)
    {
        //Find the package from the database
        InsurancePackage insurancePackage = insurancePackageRepository.findById(packageId).get();

        //Pair the package with the patient...
        Patient patient = (Patient) userRepository.findByEmail(username);
        //Check if the patient already has this insurance package
        List<InsurancePackage> heldList = patient.getInsurancePackages();
        for (int i=0; i < heldList.size(); i++)
        {
            long heldPackageId = heldList.get(i).getInsurancePackageId();
            if (heldPackageId == packageId)
            {
                throw new InsurancePackageAlreadyHeldException("You already have that package");
            }
        }
        //Map package to the patient successfully
        patient.addInsurancePackage(insurancePackage);
        insurancePackage.addPatient(patient);

        //Save the patient and return the package
        insurancePackageRepository.save(insurancePackage);
        userRepository.save(patient);
        return insurancePackage;
    }
}
