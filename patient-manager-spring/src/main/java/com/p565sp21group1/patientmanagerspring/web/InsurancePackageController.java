package com.p565sp21group1.patientmanagerspring.web;

import com.p565sp21group1.patientmanagerspring.models.Appointment;
import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import com.p565sp21group1.patientmanagerspring.models.Insurer;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.services.InsurancePackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;


@RestController
@RequestMapping(path = "/api/insurance")
public class InsurancePackageController
{
    @Autowired
    private InsurancePackageService insurancePackageService;

    @GetMapping("/get-by-insurer/{insurerId}")
    public List<InsurancePackage> getInsurancePackagesByInsurerId(@PathVariable String insurerId, Principal principal)
    {
        long userIdLong = ControllerUtility.parseUserId(insurerId);
        return insurancePackageService.getInsurancePackagesByInsurerId(userIdLong, principal.getName());
    }

    @GetMapping("/get-by-patient/{patientId}")
    public List<InsurancePackage> getInsurancePackagesByPatientId(@PathVariable String patientId, Principal principal)
    {
        long userIdLong = ControllerUtility.parseUserId(patientId);
        return insurancePackageService.getInsurancePackagesByPatientId(userIdLong, principal.getName());
    }

    @PostMapping("/create-insurance-package/")
    public ResponseEntity<?> createInsurancePackage(@RequestBody InsurancePackage insurancePackage, Principal principal)
    {
        insurancePackage = insurancePackageService.createInsurancePackage(insurancePackage, principal.getName());
        return new ResponseEntity<InsurancePackage>(insurancePackage, HttpStatus.CREATED);
    }

    //Lets a patient acquire an insurance package
    @PostMapping("/add-insurance-package/package-{packageId}/")
    public ResponseEntity<?> addInsurancePackageToPatient(@PathVariable String packageId, Principal principal)
    {
        //Parse the IDs from the URL
        long packageIdLong = ControllerUtility.parseUserId(packageId);
        //Add the insurance package to the target patient
        InsurancePackage insurancePackage = insurancePackageService.addInsurancePackageToPatient(packageIdLong, principal.getName());
        return new ResponseEntity<InsurancePackage>(insurancePackage, HttpStatus.CREATED);
    }
}
