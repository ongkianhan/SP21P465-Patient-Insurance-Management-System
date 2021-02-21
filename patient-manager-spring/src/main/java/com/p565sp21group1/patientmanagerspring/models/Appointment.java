package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.*;

@Entity
@Table(name="Appointment")
public class Appointment
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    /*@ManyToOne
    @JoinColumn(name="patientId", nullable=false)
    private Patient patient;*/
}
