package com.p565sp21group1.patientmanagerspring.web;

import com.p565sp21group1.patientmanagerspring.models.Appointment;
import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.services.AppointmentService;
import com.p565sp21group1.patientmanagerspring.services.ErrorMapValidationService;
import com.p565sp21group1.patientmanagerspring.services.UserService;
import com.p565sp21group1.patientmanagerspring.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController
{
    @Autowired
    private UserService userService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private ErrorMapValidationService errorMapValidationService;

    /**
     * Creates a new appointment object and attaches it to both the
     * patient and the doctor.
     * @param appointment the JSON data used to create a new Appointment
     * @param result contains Spring validation errors
     * @param patientId
     * @param doctorId
     * @return the new appointment as JSON or errors JSON
     */
    @PostMapping("/create-appointment/{patientId}&{doctorId}")
    public ResponseEntity<?> createAppointment(@Valid @RequestBody Appointment appointment,
            BindingResult result, @PathVariable String patientId, @PathVariable String doctorId)
    {
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        long patientIdLong = userService.parseUserId(patientId);
        long doctorIdLong = userService.parseUserId(doctorId);
        Appointment newAppointment = appointmentService.addAppointment(patientIdLong, doctorIdLong, appointment);

        return new ResponseEntity<Appointment>(newAppointment, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-patient/{patientId}")
    public Iterable<Appointment> getAppointmentsByPatientId(@PathVariable String patientId)
    {
        long patientIdLong = userService.parseUserId(patientId);
        return appointmentService.getAppointmentsByPatientId(patientIdLong);
    }

    @GetMapping("/get-by-doctor/{doctorId}")
    public Iterable<Appointment> getAppointmentsByDoctorId(@PathVariable String doctorId)
    {
        long doctorIdLong = userService.parseUserId(doctorId);
        return appointmentService.getAppointmentsByDoctorId(doctorIdLong);
    }
}
