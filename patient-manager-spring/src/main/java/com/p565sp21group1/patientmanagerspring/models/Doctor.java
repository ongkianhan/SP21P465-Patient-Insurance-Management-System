package com.p565sp21group1.patientmanagerspring.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Doctor")
@DiscriminatorValue("DOC")
public class Doctor extends User
{
    @OneToMany(mappedBy="doctor")
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();

    @Column(name = "specialization", nullable = false, unique = false)
    private String specialization;

    @Column(name = "hospitalName")
    private String hospitalName = "";

    @Column(name = "latitude", nullable = true, unique = false)
    private double latitude;

    @Column(name = "longitude", nullable = true, unique = false)
    private double longitude;

    public Doctor() {
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
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
