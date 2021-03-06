import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";

class DoctorSignupForm extends Component {

    render(){
        return(
            <div>
                <h1>
                    Welcome to the Doctor signup page
                </h1>
            </div>
        );
    }
}

export default DoctorSignupForm;