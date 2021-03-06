import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";
import Login from "./BasicLogin"

class PatientSignupForm extends Component {

    

    render(){
        return(
            <div>
                <Link to="/" >Back</Link>
                <h1>
                    Welcome to the Patient signup Page
                </h1>
                <Login role={'patient'}/>
            </div>
        );
    }
}

export default PatientSignupForm;