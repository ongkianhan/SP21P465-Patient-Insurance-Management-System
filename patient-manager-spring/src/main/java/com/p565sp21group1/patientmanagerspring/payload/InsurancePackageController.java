package com.p565sp21group1.patientmanagerspring.payload;


import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import com.p565sp21group1.patientmanagerspring.services.InsurancePackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;


@RestController
@RequestMapping(path = "api/v1/insurancePackageController")
public class InsurancePackageController {

    private final InsurancePackageService insurancePackageService;

    @Autowired
    public InsurancePackageController(InsurancePackageService insurancePackageService) {
        this.insurancePackageService = insurancePackageService;
    }

    @GetMapping
    public List<InsurancePackage> getInsurancePackageList()
    {
        return insurancePackageService.getInsurancePackageList();
    }

}
