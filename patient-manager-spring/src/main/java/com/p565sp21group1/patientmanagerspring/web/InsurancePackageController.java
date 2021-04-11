package com.p565sp21group1.patientmanagerspring.web;

import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import com.p565sp21group1.patientmanagerspring.models.Insurer;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.services.InsurancePackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping(path = "/api/insurance")
public class InsurancePackageController
{
    @Autowired
    private InsurancePackageService insurancePackageService;

    @GetMapping("/get_Insurer_InsurancePackageList")
    public List<InsurancePackage> getInsurancePackageList(Insurer insurer)
    {
        return insurancePackageService.getInsurancePackageList(insurer);
    }

    @GetMapping("/get_Patient_InsurancePackageList")
    public List<InsurancePackage> getInsurancePackageList(Patient patient)
    {
        return insurancePackageService.getInsurancePackageList(patient);
    }

    @PostMapping("/addInsurancePackage")
    public void addInsurancePackage(@RequestBody InsurancePackage thisPackage)
    {
        insurancePackageService.addInsurancePackage(thisPackage);
    }
}
