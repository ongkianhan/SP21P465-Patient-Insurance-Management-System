package com.p565sp21group1.patientmanagerspring.payload;


import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import com.p565sp21group1.patientmanagerspring.models.Insurer;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.services.InsurancePackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping(path = "api/v1/insurancePackageController")
public class InsurancePackageController {

    private final InsurancePackageService insurancePackageService;

    @Autowired
    public InsurancePackageController(InsurancePackageService insurancePackageService) {
        this.insurancePackageService = insurancePackageService;
    }


    public List<InsurancePackage> getInsurancePackageList(Insurer insurer)
    {
        return insurancePackageService.getInsurancePackageList(insurer);
    }


    public List<InsurancePackage> getInsurancePackageList(Patient patient)
    {
        return insurancePackageService.getInsurancePackageList(patient);
    }


    public void addInsurancePackage(@RequestBody InsurancePackage thisPackage)
    {
        insurancePackageService.addInsurancePackage(thisPackage);
    }

}
