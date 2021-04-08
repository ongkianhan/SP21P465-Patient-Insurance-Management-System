package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import com.p565sp21group1.patientmanagerspring.models.Insurer;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import org.springframework.stereotype.Service;
import com.p565sp21group1.patientmanagerspring.repositories.InsurancePackageRepo;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.*;

@Service
public class InsurancePackageService {

    private final InsurancePackageRepo repo;

    @Autowired
    public InsurancePackageService(InsurancePackageRepo repo) {
        this.repo = repo;
    }

    public Iterable<InsurancePackage> listALlPackages()
    {
        return repo.findAll();
    }

    public InsurancePackage getPackage(long id)
    {
        return repo.findById(id).get();
    }

    public InsurancePackage addInsurancePackage(InsurancePackage thisPackage)
    {
        return repo.save(thisPackage);
    }

    public void deletePackage (long id)
    {
        repo.deleteById(id);
    }

    public List<InsurancePackage> getInsurancePackageList(Insurer insurer)
    {
        return insurer.insurancePackagesList;
    }

    public List<InsurancePackage> getInsurancePackageList(Patient patient)
    {
        return patient.insurancePackagesList;
    }


}
