package com.p565sp21group1.patientmanagerspring.exceptions;

public class UsernameTakenExceptionResponse
{
    private String username;

    public UsernameTakenExceptionResponse(String username)
    {
        this.username = username;
    }
}