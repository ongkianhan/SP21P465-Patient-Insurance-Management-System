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


export const validateDoctor = (inputObject, errorOutput) => {
    //Check for blank fields
    addBlankFieldErrorMessage(inputObject, "specialization", errorOutput, 
        "Specialization cannot be blank");
    addBlankFieldErrorMessage(inputObject, "hospitalName", errorOutput, 
        "Hospital name cannot be blank");

    //Check if the address is blank
    if (inputObject["latitude"] == 0 && inputObject["longitude"] == 0)
    {
        errorOutput["address"] = "Address cannot be blank";
    }

    return errorOutput;
};