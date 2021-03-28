import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";
import doctorIcon from "../../static/doctorSelectionIcon.png";
import patientIcon from "../../static/patientSelectionIcon.png";
import insurerIcon from "../../static/insurerSelectionIcon.png";

class GeneralSignupForm extends Component {


    render(){
        return(
            <span>

            <p className="thin-container-title text-center">What is your role?</p>
            
            <table style={{marginLeft: "calc(20vmin)", marginRight: "calc(20vmin)", width: "auto"}}>
                <tr>
                    <td className="td-option-for-signup">
                        <Link to="/doctor-signup">
                            <img src={doctorIcon} className="image-option-for-signup"/>
                        </Link>
                    </td>
                    <td className="td-option-for-signup">
                        <Link to="/patient-signup">
                            <img src={patientIcon} className="image-option-for-signup"/>
                        </Link>
                    </td>
                    <td className="td-option-for-signup">
                        <Link to="/insurer-signup">
                            <img src={insurerIcon} className="image-option-for-signup"/>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Link to="/doctor-signup" to="/doctor-signup" className="link-option-for-signup">
                            <div className="div-option-for-signup">
                                Doctor
                            </div>
                        </Link>
                    </td>
                    <td>
                        <Link to="/patient-signup" className="link-option-for-signup">
                            <div className="div-option-for-signup">
                                Patient
                            </div>
                        </Link>
                    </td>
                    <td>
                        <Link to="/insurer-signup" className="link-option-for-signup">
                            <div className="div-option-for-signup">
                                Insurance Provider
                            </div>
                        </Link>
                    </td>
                </tr>
            
            </table>


            </span>
        );        
    }
}

export default GeneralSignupForm;