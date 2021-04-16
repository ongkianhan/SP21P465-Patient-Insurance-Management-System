import React, { Component } from 'react';
import {Link} from "react-router-dom";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";

class PatientCard extends Component 
{
    render() 
    {
        const {patient} = this.props;
        return (
            <div className="card-container">
            <div className="card card-body bg-light mb-3">
                <div className="row align-items-center">
                    <div className="col-3">
                        <img className="col mh-25" src={defaultProfileIcon} />
                    </div>
                    <div className="col-6 text-left">
                        <h3>{patient.firstName}{" "}{patient.lastName}</h3>
                        <h4>Age {patient.age}</h4>
                    </div>
                    <div className="col-3 justify-content-end">
                        <Link to={`/account/${patient.userId}`}>
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

export default PatientCard;