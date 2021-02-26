package com.p565sp21group1.patientmanagerspring.exceptions;

public class InvalidLoginExceptionResponse
{
    private String username;
    private String password;

    public InvalidLoginExceptionResponse()
    {
        this.username = "Invalid username";
        this.password = "Invalid password";
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
