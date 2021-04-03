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

    @Column(name = "latitude", nullable = true, unique = false)
    private double latitude;

    @Column(name = "longitude", nullable = true, unique = false)
    private double longitude;

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

}
