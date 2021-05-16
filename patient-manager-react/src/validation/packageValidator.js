import {
    hasNumberParseError,
    addNumberParseErrorMessage,
    addNegativeNumberErrorMessage,
    isFieldBlankOrNull,
    addBlankFieldErrorMessage,
    addBlankFieldDefaultValue,
    DEFAULT_FOR_BLANK_NUMBERS,
    DEFAULT_FOR_BLANK_STRINGS,
} from "./validationUtility";


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