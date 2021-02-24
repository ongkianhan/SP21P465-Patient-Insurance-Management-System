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

    /*
     * Registers a new user to the database.
     * @param doctor the JSON data used to create a new account
     * @param result contains Spring validation errors
     * @return the new user as JSON or errors JSON
     */
    @PostMapping("/create-appointment/{patientId}&{doctorId}")
    public ResponseEntity<?> createAppointment(@Valid @RequestBody Appointment appointment,
            BindingResult result, @PathVariable String patientId, @PathVariable String doctorId)
    {
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        long patientIdLong = userService.parseLong(patientId);
        long doctorIdLong = userService.parseLong(doctorId);
        Appointment newAppointment = appointmentService.addAppointment(patientIdLong, doctorIdLong, appointment);

        return new ResponseEntity<Appointment>(newAppointment, HttpStatus.CREATED);
    }
}
