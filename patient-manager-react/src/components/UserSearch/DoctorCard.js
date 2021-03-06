import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";

class DoctorCard extends Component 
{
    render() 
    {
        const {doctor} = this.props;
        return (
            <div class="container">
            <div class="card card-body bg-light mb-3">
                <div class="row">
                    <div class="col-2">
                        <span class="mx-auto">{doctor.firstName}</span>
                    </div>
                    <div class="col-lg-6 col-md-4 col-8">
                        <h3>{doctor.lastName}</h3>
                    </div>
                    <div class="col-md-4 d-none d-lg-block">
                        <ul class="list-group">
                            {/*<Link to={`/projectBoard/${project.projectIdentifier}`}>
                                <li class="list-group-item board">
                                    <i class="fa fa-flag-checkered pr-1">Project Board</i>
                                </li>
                            </Link>
                            <Link to={`/updateProject/${project.projectIdentifier}`}>
                                <li class="list-group-item update">
                                    <i class="fa fa-edit pr-1">Update Project Info</i>
                                </li>
                            </Link>
                                <li class="list-group-item delete" onClick={this.onDeleteClick.bind(this, project.projectIdentifier)}>
                                    <i class="fa fa-minus-circle pr-1">Delete Project</i>
                                </li>*/}
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default DoctorCard;