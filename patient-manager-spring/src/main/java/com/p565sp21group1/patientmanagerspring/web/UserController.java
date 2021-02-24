package com.p565sp21group1.patientmanagerspring.web;

import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.Insurer;
import com.p565sp21group1.patientmanagerspring.models.Patient;
import com.p565sp21group1.patientmanagerspring.models.User;
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
@RequestMapping("/api/account")
public class UserController
{
    @Autowired
    private UserService userService;

    @Autowired
    private ErrorMapValidationService errorMapValidationService;

    @Autowired
    private UserValidator userValidator;

    /**
     * Registers a new user to the database.
     * @param doctor the JSON data used to create a new account
     * @param result contains Spring validation errors
     * @return the new user as JSON or errors JSON
     */
    @PostMapping("/create-doctor")
    public ResponseEntity<?> createNewDoctor(@Valid @RequestBody Doctor doctor, BindingResult result)
    {
        //Validate passwords
        userValidator.validate(doctor, result);

        //Return errors if the annotations in User class cause them
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        Doctor newDoctor = (Doctor) userService.saveOrUpdateUser(doctor);
        return new ResponseEntity<Doctor>(newDoctor, HttpStatus.CREATED);
    }

    /**
     * Registers a new user to the database.
     * @param patient the JSON data used to create a new account
     * @param result contains Spring validation errors
     * @return the new user as JSON or errors JSON
     */
    @PostMapping("/create-patient")
    public ResponseEntity<?> createNewPatient(@Valid @RequestBody Patient patient, BindingResult result)
    {
        //Validate passwords
        userValidator.validate(patient, result);

        //Return errors if the annotations in User class cause them
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        Patient newPatient = (Patient) userService.saveOrUpdateUser(patient);
        return new ResponseEntity<Patient>(newPatient, HttpStatus.CREATED);
    }

    /**
     * Registers a new user to the database.
     * @param insurer the JSON data used to create a new account
     * @param result contains Spring validation errors
     * @return the new user as JSON or errors JSON
     */
    @PostMapping("/create-insurer")
    public ResponseEntity<?> createNewInsurer(@Valid @RequestBody Insurer insurer, BindingResult result)
    {
        //Validate passwords
        userValidator.validate(insurer, result);

        //Return errors if the annotations in User class cause them
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        Insurer newInsurer = (Insurer) userService.saveOrUpdateUser(insurer);
        return new ResponseEntity<Insurer>(newInsurer, HttpStatus.CREATED);
    }

    @GetMapping("/all-doctors")
    public Iterable<Doctor> getAllDoctors(){return userService.getAllDoctors();}
}
