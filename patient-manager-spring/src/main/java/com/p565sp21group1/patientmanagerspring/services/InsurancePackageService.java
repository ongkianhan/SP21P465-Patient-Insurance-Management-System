package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InsurancePackageService {

    private InsurancePackage InsurancePackage;

    public List<InsurancePackage> getInsurancePackageList()
    {
        return List.of(InsurancePackage);
    }
}
