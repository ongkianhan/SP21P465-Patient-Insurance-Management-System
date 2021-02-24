package com.p565sp21group1.patientmanagerspring.validator;

import com.p565sp21group1.patientmanagerspring.models.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator
{
    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        User user = (User) object;
        if (!user.getPassword().equals( user.getConfirmPassword() ))
        {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }
    }
}