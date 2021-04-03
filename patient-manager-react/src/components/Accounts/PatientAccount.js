import React, { Component } from "react";
import { createNewUser, validateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getCurrentUser } from "../../actions/userActions";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";
import {Link} from "react-router-dom";

class PatientAccount extends Component {
    constructor() {
        super();        
    }


    render() {
        
        const {currentUser} = this.props.currentUser

        console.log(currentUser)
        return (
            <div className="container">
                <div className="row">
                    <div className = "col-3">
                        <img className="col" src={defaultProfileIcon} />
                    </div>
                    <div className = "col-6 text-left">
                        <h1 className = "font-weight-bold">{currentUser.firstName} {currentUser.lastName}</h1>
                        <h3>{currentUser.email}</h3>
                    </div>
                    <div className = "col-3 text-left">
                    {this.props.security.user.userType == "PAT" ? (
                        <Link to={`/schedule-appointment/${currentUser.userId}`}>
                            <button className="col my-1 button-primary button-card">
                                Make Appointment
                            </button>
                        </Link>
                    ) : (<span/>)}
                        
                        {/*<Link to={""}>
                            <button className="col my-1 button-secondary button-card">
                                Show Directions
                            </button>
                    </Link>*/}
                    </div>
                </div>
                {/*<div className="row pt-5">
                    <div className="col-6 text-left">
                    {currentUser.drinking ? (
                        <h2>Does drink</h2>
                    ) : (<h2>Does not drink</h2>)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-left">
                    {currentUser.smoking ? (
                        <h2>Does smoke</h2>
                    ) : (<h2>Does not smoke</h2>)}
                    </div>
                </div>*/}
            </div>
        );
    }
}



PatientAccount.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    validateUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, { getCurrentUser, validateUser })(PatientAccount);