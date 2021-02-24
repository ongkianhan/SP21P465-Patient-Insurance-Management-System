package com.p565sp21group1.patientmanagerspring.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Credit to https://github.com/AgileIntelligence/AgileIntPPMTool/
 * for the method logic in this class.
 */
@RestController
@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler
{
    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(UsernameTakenException ex, WebRequest request)
    {
        UsernameTakenExceptionResponse exceptionResponse = new UsernameTakenExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    /*@ExceptionHandler
    public final ResponseEntity<Object> handleUsernameTakenException(UsernameTakenException ex, WebRequest request)
    {
        UsernameTakenExceptionResponse exceptionResponse = new UsernameTakenExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }*/
}
