import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";

class ProviderSignupForm extends Component {
    render(){
        return(
            <div>
                <h1>
                    Welcome to the Insurance Provider signup page
                </h1>
            </div>
        );
    }
}

export default ProviderSignupForm;