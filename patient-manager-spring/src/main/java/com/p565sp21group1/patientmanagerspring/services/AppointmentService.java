package com.p565sp21group1.patientmanagerspring.services;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;
import com.p565sp21group1.patientmanagerspring.models.Appointment;
import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.repositories.AppointmentRepository;
import com.p565sp21group1.patientmanagerspring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AppointmentService
{
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Appointment addAppointment(long doctorId, Appointment appointment, String username)
    {
        try
        {
            //Pair the appointment with the patient...
            //Calling get() retrieves the actual User from the repos
            Patient patient = (Patient) userRepository.findByEmail(username);
            appointment.setPatient(patient);

            //Pair the appointment with the doctor...
            //Calling get() retrieves the actual User from the repos
            Doctor doctor = (Doctor) userRepository.findById(doctorId).get();
            appointment.setDoctor(doctor);

            return appointmentRepository.save(appointment);
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("The patient or doctor could not be found.");
        }

    }

    public Iterable<Appointment> getAppointmentsByPatientId(long patientId, String username)
    {
        //FIXME might not work correctly if the user is in a different time zone than the server?
        Date now = new Date(); //pass in the current time to only show upcoming Appointments
        return appointmentRepository.getAppointmentsByPatientId(patientId, now);
    }

    public Iterable<Appointment> getAppointmentsByDoctorId(long doctorId)
    {
        Date now = new Date(); //pass in the current time to only show upcoming Appointments
        return appointmentRepository.getAppointmentsByDoctorId(doctorId, now);
    }
}
