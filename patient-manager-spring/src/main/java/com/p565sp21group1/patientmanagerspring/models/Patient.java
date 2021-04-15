package com.p565sp21group1.patientmanagerspring.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Patient")
@DiscriminatorValue("PAT")
public class Patient extends User
{
    @OneToMany(mappedBy="patient")
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();

    @Column(name = "age", nullable = false, unique = false)
    private int age;

    @Column(name = "isSmoking", nullable = false, unique = false)
    private boolean isSmoking;

    @Column(name = "isDrinking", nullable = false, unique = false)
    private boolean isDrinking;

    @Column(name = "medicalHistory", nullable = false, unique = false)
    private String medicalHistory;

    @Column(name = "allergies", nullable = false, unique = false)
    private String allergies;

    @Column(name = "latitude", nullable = true, unique = false)
    private double latitude;

    @Column(name = "longitude", nullable = true, unique = false)
    private double longitude;

    @OneToMany(mappedBy="patientsList")
    //@JsonIgnore
    private List<InsurancePackage> insurancePackagesList = new ArrayList<>();

    @OneToMany(mappedBy="patientsList")
    @JsonIgnore
    public List<InsurancePackage> recommendations = new ArrayList<>();


    public Patient() {
        this.setUserType("PAT");
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isSmoking() {
        return isSmoking;
    }

    public void setSmoking(boolean smoking) {
        isSmoking = smoking;
    }

    public boolean isDrinking() {
        return isDrinking;
    }

    public void setDrinking(boolean drinking) {
        isDrinking = drinking;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public List<InsurancePackage> getInsurancePackages() {
        return insurancePackagesList;
    }

    public void setInsurancePackageList(List<InsurancePackage> insurancePackages)
    {
        this.insurancePackagesList = insurancePackages;
    }

    public List<InsurancePackage> addInsurancePackage(InsurancePackage insurancePackage)
    {
        if (insurancePackagesList == null)
            this.insurancePackagesList = new ArrayList<>();
        this.insurancePackagesList.add(insurancePackage);
        return this.insurancePackagesList;
    }

    public List<InsurancePackage> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<InsurancePackage> recommendations) {
        this.recommendations = recommendations;
    }
}
