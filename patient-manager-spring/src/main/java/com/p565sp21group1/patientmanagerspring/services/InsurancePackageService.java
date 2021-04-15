package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.InsurancePackageAlreadyHeldException;
import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.models.*;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.stereotype.Service;
import com.p565sp21group1.patientmanagerspring.repositories.InsurancePackageRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;


@Service
public class InsurancePackageService
{
    @Autowired
    private InsurancePackageRepository insurancePackageRepository;

    @Autowired
    private UserRepository userRepository;

    public Iterable<InsurancePackage> getAllInsurancePackages()
    {
        return insurancePackageRepository.findAll();
    }

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

    //This method is called when a patient or insurer adds an InsurancePackage to the target patient's list
    public InsurancePackage saveInsurancePackageToPatient(long packageId, String patientUsername, boolean isRecommendation)
    {
        //Find the package from the database
        InsurancePackage insurancePackage = insurancePackageRepository.findById(packageId).get();
        //Ensure that it is not a recommendation
        insurancePackage.setRecommendation(isRecommendation);

        //Pair the package with the patient...
        Patient patient = (Patient) userRepository.findByEmail(patientUsername);
        //Check if the patient already has this insurance package
        List<InsurancePackage> heldList = insurancePackageRepository.getInsurancePackagesByPatientId(patient.getUserId());
        for (int i=0; i < heldList.size(); i++)
        {
            long heldPackageId = heldList.get(i).getInsurancePackageId();
            if (heldPackageId == packageId)
            {
                throw new InsurancePackageAlreadyHeldException("The patient already has that package");
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


    public List<InsurancePackage> removeInsurancePackageFromPatient(long packageId, String username)
    {
        //Find the package from the database
        InsurancePackage insurancePackage = insurancePackageRepository.findById(packageId).get();
        //Find the patient from the database
        Patient patient = (Patient) userRepository.findByEmail(username);

        //Remove the package from the patient
        patient.removeInsurancePackage(insurancePackage);
        insurancePackage.removePatient(patient);

        //Save the patient and package
        insurancePackageRepository.save(insurancePackage);
        userRepository.save(patient);
        //Return the patient's new list
        return patient.getInsurancePackagesList();
    }

    //Lets a patient update the recommended status of an insurance package they hold
    public void acceptInsurancePackageRecommendation(long packageId, String username)
    {
        //Find the package from the database
        InsurancePackage insurancePackage = insurancePackageRepository.findById(packageId).get();

        //Remove the package from the patient
        insurancePackage.setRecommendation(false);

        //Save the package
        insurancePackageRepository.save(insurancePackage);
    }
}
