package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

@Entity
@Table
public class InsurancePackage
{
    //to be used to construct an object of InsurancePackage
    public InsurancePackage(String firmName, String packageName, String packageDetails, Long insurancePackageID, double premium, double deductible, double copayment, double coInsurance, double maximumOutOfPocket) {
        this.firmName = firmName;
        this.packageName = packageName;
        this.packageDetails = packageDetails;
        this.insurancePackageID = insurancePackageID;
        this.premium = premium;
        this.deductible = deductible;
        this.copayment = copayment;
        this.coInsurance = coInsurance;
        this.maximumOutOfPocket = maximumOutOfPocket;
    }

    //to be used for obtaining an insurance package from the database

    public InsurancePackage(String firmName, String packageName, String packageDetails, double premium, double deductible, double copayment, double coInsurance, double maximumOutOfPocket) {
        this.firmName = firmName;
        this.packageName = packageName;
        this.packageDetails = packageDetails;
        this.premium = premium;
        this.deductible = deductible;
        this.copayment = copayment;
        this.coInsurance = coInsurance;
        this.maximumOutOfPocket = maximumOutOfPocket;
    }

    private String firmName;

    private String packageName;

    public InsurancePackage() {

    }


    public void setPackageName(String packageName)
    {
        this.packageName = packageName;
    }

    public String getPackageName() { return packageName; }


    //below are the details for a standard insurance package


    public String packageDetails; // contains details and/or comments that the insurer feels is relevant

    @Id
    public Long insurancePackageID; // assuming we don't have over 2 billion packages, but this can be changed to long if needed


    public Long getInsurancePackageID() {
        return insurancePackageID;
    }

    public void setInsurancePackageID(Long insurancePackageID) {
        this.insurancePackageID = insurancePackageID;
    }

    public String getPackageDetails() {
        return packageDetails;
    }

    public void setPackageDetails(String packageDetails) {
        this.packageDetails = packageDetails;
    }

    public double premium, deductible, copayment, coInsurance, maximumOutOfPocket;

    public double getPremium() { return premium; }

    public void setPremium(double premium) {
        this.premium = premium;
    }

    public double getDeductible() {
        return deductible;
    }

    public void setDeductible(double deductible) {
        this.deductible = deductible;
    }

    public double getCopayment() {
        return copayment;
    }

    public void setCopayment(double copayment) {
        this.copayment = copayment;
    }

    public double getCoInsurance() {
        return coInsurance;
    }

    public void setCoInsurance(double coInsurance) {
        this.coInsurance = coInsurance;
    }

    public double getMaximumOutOfPocket() {
        return maximumOutOfPocket;
    }

    public void setMaximumOutOfPocket(double maximumOutOfPocket) {
        this.maximumOutOfPocket = maximumOutOfPocket;
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }

    @Override
    public String toString() {
        return "InsurancePackage{" +
                "firmName='" + firmName + '\'' +
                ", packageName='" + packageName + '\'' +
                ", packageDetails='" + packageDetails + '\'' +
                ", insurancePackageID=" + insurancePackageID +
                ", premium=" + premium +
                ", deductible=" + deductible +
                ", copayment=" + copayment +
                ", coInsurance=" + coInsurance +
                ", maximumOutOfPocket=" + maximumOutOfPocket +
                '}';
    }
}