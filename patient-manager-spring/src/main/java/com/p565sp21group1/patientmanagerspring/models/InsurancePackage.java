package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import java.util

@Entity
@Table(name = "Insurance Package")
@DiscriminatorValue("INS PACK")
public class InsurancePackage
{
    @Column(name = "firmName", nullable = false, unique = false)
    @NotBlank(message = "Company name cannot be blank")
    private String firmName;

    private String packageName;

    public void setPackageName(String packageName)
    {
        this.packageName = packageName;
    }

    public String getPackageName() { return packageName; }

    public Insurer() {
        this.setUserType("INS");
    }

    public Long ID;

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    //below are the details for a standard insurance package

    public InsurancePackage()
    {

    }

    public String packageDetails; // contains details and/or comments that the insurer feels is relevant

    public int insurancePackageID; // assuming we don't have over 2 billion packages, but this can be changed to long if needed

    public int getInsurancePackageID() {
        return insurancePackageID;
    }

    public void setInsurancePackageID(int insurancePackageID) {
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
}