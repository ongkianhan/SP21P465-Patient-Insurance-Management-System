import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";
import doctorStockImage from "../../static/doctorStockImage.jpg";

class GeneralSignupForm extends Component {


    render(){
        return(
            <span>

            <p className="thin-container-title text-center">What is your role?</p>

            {/*<div style={{width:'50%',display:'inline-block', marginLeft:'auto',marginRight:'auto', paddingTop:'2%'}}>
                <div class="row">
                    <div class="col-xs-4 col-md-4">
                        <img src={defaultProfileIcon} style={{width:'100%'}}/>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <img src={defaultProfileIcon} style={{width:'100%'}}/>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <img src={defaultProfileIcon} style={{width:'100%'}}/>
                    </div>
                </div>
                <div class="row" style = {{paddingTop:'2%'}}>
                    <div class="col-xs-4 col-md-4">
                        <Link 
                        className="button-generic button-jumbo"
                        to="/doctor-signup"
                        style={{backgroundColor: "#0000AA"}}>
                            Doctor
                        </Link>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <Link 
                        className="button-generic button-jumbo"
                        to="/patient-signup"
                        style={{backgroundColor: "#00AA00"}}>
                            Patient
                        </Link>
                    </div>
                    <div class="col-xs-4 col-md-4">
                        <Link 
                        className="button-generic button-jumbo"
                        to="/insurer-signup"
                        style={{backgroundColor: "#AA0000"}}>
                            Insurance Provider
                        </Link>
                    </div>
                </div>
            </div>*/}
            
            <table style={{marginLeft: "calc(20vmin)", marginRight: "calc(20vmin)", width: "auto"}}>
                <tr>
                    <td className="td-option-for-signup">
                        <Link to="/doctor-signup">
                            <img src={doctorStockImage} className="image-option-for-signup"/>
                        </Link>
                    </td>
                    <td className="td-option-for-signup">
                        <Link to="/patient-signup">
                            <img src={doctorStockImage} className="image-option-for-signup"/>
                        </Link>
                    </td>
                    <td className="td-option-for-signup">
                        <Link to="/insurer-signup">
                            <img src={doctorStockImage} className="image-option-for-signup"/>
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