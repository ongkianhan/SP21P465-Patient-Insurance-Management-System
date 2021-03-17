package com.p565sp21group1.patientmanagerspring.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class PermissionDeniedException extends RuntimeException
{
    public PermissionDeniedException(String message) {
        super(message);
    }
}