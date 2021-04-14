package com.p565sp21group1.patientmanagerspring.web;

import com.p565sp21group1.patientmanagerspring.exceptions.UserNotFoundException;

public class ControllerUtility
{
    /**
     * Converts a URL parameter to a long
     */
    public static long parseUserId(String id)
    {
        try
        {
            return Long.parseLong(id);
        }
        catch (NumberFormatException ex)
        {
            throw new UserNotFoundException("Invalid ID");
        }
    }
}
