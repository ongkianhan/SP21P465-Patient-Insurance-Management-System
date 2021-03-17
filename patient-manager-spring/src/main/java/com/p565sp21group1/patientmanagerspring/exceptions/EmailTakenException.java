package com.p565sp21group1.patientmanagerspring.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmailTakenException extends RuntimeException
{
    public EmailTakenException(String message) {
        super(message);
    }
}
