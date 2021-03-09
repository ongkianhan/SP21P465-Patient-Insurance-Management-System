package com.p565sp21group1.patientmanagerspring.exceptions;

public class EmailTakenExceptionResponse
{
    private String username;

    public EmailTakenExceptionResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
