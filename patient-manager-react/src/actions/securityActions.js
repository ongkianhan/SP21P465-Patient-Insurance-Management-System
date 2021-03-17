import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwtDecode from "jwt-decode";

/**
 * Significant credit for this file to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 */


//Register the user or show errors 
export const createNewUser = (newUser, userType, history) => async dispatch => {
    try
    {
        await axios.post("/api/account/create-"+userType, newUser);
        dispatch({
            type: GET_ERRORS, 
            payload: {} //Clear the errors
        });
    }
    catch (err)
    {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const createNewInsurer = (newUser, history) => async dispatch => {
    try
    {
        await axios.post("/api/account/create-insurer", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS, 
            payload: {} //Clear the errors
        });
    }
    catch (err)
    {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const createNewPatient = (newUser, history) => async dispatch => {
    try
    {
        await axios.post("/api/account/create-patient", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS, 
            payload: {} //Clear the errors
        });
    }
    catch (err)
    {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

//Log in and store the JWT token response in the header
export const login = LoginRequest => async dispatch => {
    try
    {
        //Send a LoginRequest to Spring
        const res = await axios.post("/api/account/login", LoginRequest);
        //Extract JWT token from the response data
        const { token } = res.data;
        //Store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        //Set our token in header ***
        setJWTToken(token);
        //Decode token on React
        const decoded = jwtDecode(token);
        //Dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
      }
      catch (err)
      {
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          });
      }
};

//Log out and remove the JWT
export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};


export const validateUser = ( user) => {
    const errorOutput = {};
    //Check if the first name or last name contain a number
    if (/\d/.test(user.firstName))
    {
        errorOutput["firstName"] = "First name cannot contain numbers";
    }
    if (/\d/.test(user.lastName))
    {
        errorOutput["lastName"] = "Last name cannot contain numbers";
    }
    return errorOutput;
}