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


export const validateInsurancePackage = (insurance) => {
    const errorOutput = {};

    //Ensure co-insurance is a decimal from 0-1
    var coInsurance = insurance["coInsurance"];
    if (coInsurance != null && coInsurance != "")
    {
        var percentage = parseFloat(coInsurance);
        if (isNaN(percentage) || percentage < 0 || percentage > 1)
        {
            errorOutput["coInsurance"] = "Must be a number between 0-1";
        }
    }

    //Check numeric fields for non-numeric data
    addNumberParseErrorMessage(insurance, "premium", errorOutput, 
        "Premium must be a number");
    addNumberParseErrorMessage(insurance, "deductible", errorOutput, 
        "Deductible must be a number");
    addNumberParseErrorMessage(insurance, "copayment", errorOutput, 
        "Co-payment must be a number");
    addNumberParseErrorMessage(insurance, "coInsurance", errorOutput, 
        "Co-insurance must be a number");
    addNumberParseErrorMessage(insurance, "maximumOutOfPocket", errorOutput, 
        "Max out-of-pocket  must be a number");
        
    //Check numeric fields for negative inputs
    addNegativeNumberErrorMessage(insurance, "premium", errorOutput, 
        "Premium cannot be negative");
    addNegativeNumberErrorMessage(insurance, "deductible", errorOutput, 
        "Deductible cannot be negative");
    addNegativeNumberErrorMessage(insurance, "copayment", errorOutput, 
        "Co-payment cannot be negative");
    addNegativeNumberErrorMessage(insurance, "coInsurance", errorOutput, 
        "Co-insurance cannot be negative");
    addNegativeNumberErrorMessage(insurance, "maximumOutOfPocket", errorOutput, 
        "Max out-of-pocket cannot be negative");

    //Check for blank fields
    addBlankFieldErrorMessage(insurance, "packageName", errorOutput, 
        "Package name cannot be blank");
    addBlankFieldErrorMessage(insurance, "premium", errorOutput, 
        "Premium cannot be blank");
    addBlankFieldErrorMessage(insurance, "deductible", errorOutput, 
        "Deductible cannot be blank");

    return errorOutput;
}






const DEFAULT_FOR_BLANK_NUMBERS = -1;
const DEFAULT_FOR_BLANK_STRINGS = "N/A";

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

/**
 * Adds default values to the input insurance package for blank/null fields.
 */
export const putDefaultValuesInInsurancePackage = (insurance) => 
{
    //Add default values to blank numeric fields
    addBlankFieldDefaultValue(insurance, "copayment", DEFAULT_FOR_BLANK_NUMBERS);
    addBlankFieldDefaultValue(insurance, "coInsurance", 0);
    addBlankFieldDefaultValue(insurance, "maximumOutOfPocket", DEFAULT_FOR_BLANK_NUMBERS);
    //Add default values to blank string fields
    addBlankFieldDefaultValue(insurance, "packageDetails", DEFAULT_FOR_BLANK_STRINGS);

    return insurance;
}