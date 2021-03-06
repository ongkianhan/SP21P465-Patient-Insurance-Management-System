import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";

class GeneralSignupForm extends Component {


    render(){
        return(
            <div>
                <Link to="/find-doctors" >Go To Doctors</Link>
                <br></br>
                <Link to="/doctor-signup" >Go To Doctor Signup</Link>
                <br></br>
                <Link to="/patient-signup" >Go To Patient Signup</Link>
                <br></br>
                <Link to="/insurer-signup" >Go To Insurance Provider Signup</Link>
            </div>
        );        
    }
}

export default GeneralSignupForm;