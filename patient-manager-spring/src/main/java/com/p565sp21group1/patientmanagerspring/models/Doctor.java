package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.*;

@Entity
@Table(name = "Doctor")
@DiscriminatorValue("DOC")
public class Doctor extends User
{
    @Column(name = "specialization", nullable = false, unique = false)
    private String specialization;

    public Doctor() {
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}
