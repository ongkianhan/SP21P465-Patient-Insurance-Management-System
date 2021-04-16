/**
 * Check if the input string can be parsed into a number.
 */
 const hasNumberParseError = (input) => {
    var value = parseFloat(input);
    return isNaN(value);
}

/**
 * If the targetObject's specified property cannot be parsed into a number, add the
 * input message to the errorOutput object and use the same property name. 
 * Do nothing if the field is blank or null.
 */
export const addNumberParseErrorMessage = (targetObject, propertyName, errorOutput, message) => {
    //Take no action if the field is blank or null
    if (targetObject[propertyName] != null && targetObject[propertyName] != "")
    {
        //Add the error if the string is not a number
        if (hasNumberParseError(targetObject[propertyName]))
        {
            errorOutput[propertyName] = message;
        }
    }
    return errorOutput;
}

/**
 * If the targetObject's specified property is < 0, add the 
 * input message to the errorOutput object and use the same property name. 
 */
 export const addNegativeNumberErrorMessage = (targetObject, propertyName, errorOutput, message) => {
    var value = parseFloat(targetObject[propertyName]);
    if (value < 0)
    {
        errorOutput[propertyName] = message;
    }
    return errorOutput;
}


/**
 * If the targetObject's specified property is blank or null, returns true.
 */
export const isFieldBlankOrNull = (targetObject, propertyName) => {
    if (targetObject[propertyName] === null || targetObject[propertyName] === "")
    {
        return true;
    }
    return false;
}

/**
 * If the targetObject's specified property is blank or null, add the 
 * input message to the errorOutput object and use the same property name. 
 */
 export const addBlankFieldErrorMessage = (targetObject, propertyName, errorOutput, message) => {
    if (isFieldBlankOrNull(targetObject, propertyName))
    {
        errorOutput[propertyName] = message;
    }
    return errorOutput;
}



export const DEFAULT_FOR_BLANK_NUMBERS = -1;
export const DEFAULT_FOR_BLANK_STRINGS = "N/A";

/**
 * Modifies the targetObject's property so thhat it is defaultValue
 * when that property is blank or null.
 */
export const addBlankFieldDefaultValue = (targetObject, propertyName, defaultValue) => {
    if (isFieldBlankOrNull(targetObject, propertyName))
    {
        targetObject[propertyName] = defaultValue;
    }
}