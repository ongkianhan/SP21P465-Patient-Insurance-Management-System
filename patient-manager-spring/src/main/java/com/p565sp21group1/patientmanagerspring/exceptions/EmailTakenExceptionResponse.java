package com.p565sp21group1.patientmanagerspring.exceptions;

public class EmailTakenExceptionResponse
{
    private String email;

    public EmailTakenExceptionResponse(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
