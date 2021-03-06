import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";

class PatientSignupForm extends Component {

    render(){
        return(
            <div>
                <h1>
                    Welcome to the Patient signup page
                </h1>
            </div>
        );
    }
}

export default PatientSignupForm;