import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";
import Login from "./BasicLogin"

class DoctorSignupForm extends Component {



    render(){
        return(
            <div>
                <Link to="/" >Back</Link>
                <h1>
                    Welcome to the Doctor signup Page
                </h1>
                <Login />
            </div>
        );
    }
}

export default DoctorSignupForm;