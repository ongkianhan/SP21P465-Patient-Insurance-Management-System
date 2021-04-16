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


export const validatePatient = (inputObject, errorOutput) => {
    //Check numeric fields for non-numeric data
    addNumberParseErrorMessage(
        inputObject,
        "age",
        errorOutput,
        "Age must be a number"
    );
    addNumberParseErrorMessage(
        inputObject,
        "height",
        errorOutput,
        "Height must be a number"
    );
    addNumberParseErrorMessage(
        inputObject,
        "weight",
        errorOutput,
        "Weight must be a number"
    );

    //Check numeric fields for negative inputs
    addNegativeNumberErrorMessage(
        inputObject,
        "age",
        errorOutput,
        "Age cannot be negative"
    );
    addNegativeNumberErrorMessage(
        inputObject,
        "height",
        errorOutput,
        "Height cannot be negative"
    );
    addNegativeNumberErrorMessage(
        inputObject,
        "weight",
        errorOutput,
        "Weight cannot be negative"
    );

    return errorOutput;
};