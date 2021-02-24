package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Doctor")
@DiscriminatorValue("DOC")
public class Doctor extends User
{
    @OneToMany(mappedBy="doctor")
    private List<Appointment> appointments = new ArrayList<>();

    @Column(name = "specialization", nullable = false, unique = false)
    private String specialization;

    @Column(name = "latitude", nullable = true, unique = false)
    private long latitude;

    @Column(name = "longitude", nullable = true, unique = false)
    private long longitude;

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
