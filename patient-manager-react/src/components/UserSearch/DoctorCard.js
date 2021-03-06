import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
//import defaultProfileIcon from "../../../public/defaultProfileIcon.png";

class DoctorCard extends Component 
{
    render() 
    {
        const {doctor} = this.props;
        return (
            <div class="container">
            <div class="card card-body bg-light mb-3">
                <div class="row">
                    <div class="col-4">
                        {/*<img src={defaultProfileIcon} />*/}
                    </div>
                    <div class="col-8 text-left">
                        <h3>{doctor.firstName}{" "}{doctor.lastName}</h3>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default DoctorCard;