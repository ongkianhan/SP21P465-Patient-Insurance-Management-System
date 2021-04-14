package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

@Entity
@Table
public class InsurancePackage
{
    @Id
    public long insurancePackageId;

    private String firmName;

    private String packageName;

    //Below are the details for a standard insurance package

    public String packageDetails; // contains details and/or comments that the insurer feels is relevant

    public double premium, deductible, copayment, coInsurance, maximumOutOfPocket;
    // premium = monthly payment
    // deductible = deductible is how much you’ll pay for a covered procedure before your insurance starts to pay,
    // copayment = fixed amount that you pay for a specific service or prescription medication.
    // coinsurance = it’s a percentage of the cost that you pay for covered services.
    // maximum out of pocket = out-of-pocket limit, is the most you’d ever have to pay for covered health care services in a year.


    public InsurancePackage() {
    }


    public void setPackageName(String packageName)
    {
        this.packageName = packageName;
    }

    public String getPackageName() { return packageName; }

    public Long getInsurancePackageId() {
        return insurancePackageId;
    }

    public void setInsurancePackageId(Long insurancePackageId) {
        this.insurancePackageId = insurancePackageId;
    }

    public String getPackageDetails() {
        return packageDetails;
    }

    public void setPackageDetails(String packageDetails) {
        this.packageDetails = packageDetails;
    }

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
