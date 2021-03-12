import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types"
import { Link } from "react-router-dom";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";

class GeneralSignupForm extends Component {


    render(){
        return(
            <div style={{width:'50%',display:'inline-block', marginLeft:'auto',marginRight:'auto', paddingTop:'2%'}}>
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
                
                
                
            </div>
        );        
    }
}

export default GeneralSignupForm;