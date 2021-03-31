import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import defaultProfileIcon from "../static/defaultProfileIcon.png";
import { connect } from "react-redux";


class DoctorAppointmentCard extends Component 
{

    


    render() {
    let date = (new Date(this.props.appointment.date))
    date = date.toString();
    date = date.slice(0,21);
    let AMorPM;
    if(parseInt(date.slice(15,18))>=12){
        AMorPM = "PM"
    }
    else{
        AMorPM = "AM";
    }

    if(parseInt(date.slice(15,18))>=13){
        date = (date.slice(0,15) +" "+ (parseInt(date.slice(15,18))-12).toString()+(date.slice(18,21)))
    }
    console.log(AMorPM);

    
        const {appointment} = this.props;
        return (
            <div className="container row align-items-left pl-5" style = {{width:'100vh'}}>
            <div className="card card-body bg-light">
                <div className="row align-items-center">
                    <div className="col-8 text-left">
                        <h1>{appointment.patient.firstName} {appointment.patient.lastName}</h1>
                        <h3>{date} {AMorPM}</h3>
                        <h5></h5>
                        <p></p>
                    </div>
                    <div className="col-4">
                        <Link to=""><h1 className="button-secondary btn-lg">View Patient</h1></Link>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default DoctorAppointmentCard;