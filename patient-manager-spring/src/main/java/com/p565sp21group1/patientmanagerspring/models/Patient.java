package com.p565sp21group1.patientmanagerspring.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Patient")
@DiscriminatorValue("PAT")
public class Patient extends User
{
    @OneToMany(mappedBy="patient")
    private List<Appointment> appointments = new ArrayList<>();

    @Column(name = "age", nullable = false, unique = false)
    private int age;

    @Column(name = "isSmoking", nullable = false, unique = false)
    private boolean isSmoking;

    @Column(name = "isDrinking", nullable = false, unique = false)
    private boolean isDrinking;

    @Column(name = "latitude", nullable = true, unique = false)
    private long latitude;

    @Column(name = "longitude", nullable = true, unique = false)
    private long longitude;

    public Patient() {
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

    public long getLatitude() {
        return latitude;
    }

    public void setLatitude(long latitude) {
        this.latitude = latitude;
    }

    public long getLongitude() {
        return longitude;
    }

    public void setLongitude(long longitude) {
        this.longitude = longitude;
    }
}
