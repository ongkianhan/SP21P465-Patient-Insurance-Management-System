import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";
import Login from "./BasicLogin"

class InsurerSignupForm extends Component {
    render(){
        return(
            <div>
                <Link to="/" >Back</Link>
                <h1>
                    Welcome to the Insurance Provider signup page
                </h1>
                <Login role={'insurer'}/>
            </div>
        );
    }
}

export default InsurerSignupForm;