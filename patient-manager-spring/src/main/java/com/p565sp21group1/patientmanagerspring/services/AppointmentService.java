package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.models.Appointment;
import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.repositories.AppointmentRepository;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService
{
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Appointment addAppointment(long patientId, long doctorId, Appointment appointment)
    {
        try
        {
            //Pair the appointment with the patient...
            //Calling get() retrieves the actual User from the repos
            Patient patient = (Patient) userRepository.findById(patientId).get();
            appointment.setPatient(patient);

            //Pair the appointment with the doctor...
            //Calling get() retrieves the actual User from the repos
            Doctor doctor = (Doctor) userRepository.findById(doctorId).get();
            appointment.setDoctor(doctor);

            //TODO: set any initial values for the Appt if they exist

            return appointmentRepository.save(appointment);
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("The patient or doctor could not be found.");
        }

    }
}
