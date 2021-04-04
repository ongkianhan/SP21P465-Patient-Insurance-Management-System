package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

@Entity
@Table(name = "Insurer")
@DiscriminatorValue("INS")
public class Insurer extends User
{
    @Column(name = "firmName", nullable = false, unique = false)
    @NotBlank(message = "Company name cannot be blank")
    private String firmName;

    public Insurer() {
        this.setUserType("INS");
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }

    @Column(name = "latitude", nullable = true, unique = false)     //location for insurer is required for maps
    private double latitude;

    @Column(name = "longitude", nullable = true, unique = false)
    private double longitude;


    public List<InsurancePackage> getInsurancePackageOfferings() {
        return InsurancePackageOfferings;
    }

    public void setInsurancePackageOfferings(List<InsurancePackage> offerings)
    {
        this.InsurancePackageOfferings = offerings;
    }

    public List<InsurancePackage> InsurancePackageOfferings = new ArrayList<>();



}
