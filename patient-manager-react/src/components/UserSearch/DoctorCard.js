import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";

class DoctorCard extends Component 
{
    render() 
    {
        const {doctor} = this.props;
        return (
            <div className="container">
            <div className="card card-body bg-light mb-3">
                <div className="row align-items-center">
                    <div className="col-3">
                        <img className="col mh-25" src={defaultProfileIcon} />
                    </div>
                    <div className="col-6 text-left">
                        <h3>{doctor.firstName}{" "}{doctor.lastName}</h3>
                        <h4>{doctor.specialization}</h4>
                        <h4>{doctor.hospitalName}</h4>
                    </div>
                    <div className="col-3 justify-content-end">
                        <Link to={`/appointments/${doctor.userId}`}>
                            <button className="col my-1 button-primary button-card">
                                Make Appointment
                            </button>
                        </Link>
                        <Link to={`/account/${doctor.userId}`}>
                            <button className="col my-1 button-secondary card-button">
                                View Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default DoctorCard;