import React, { Component } from "react";
import { createNewUser, validateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getCurrentUser } from "../../actions/userActions";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";
import {Link} from "react-router-dom";
import MapContainer from "../GoogleMaps/MapContainer";

class DoctorAccount extends Component {
    constructor() {
        super();        
    }

    

    render() {

        const {currentUser} = this.props.currentUser;
        return (
            <div className="container">
                <div className="row">
                    <div className = "col-3">
                        <img className="col" src={defaultProfileIcon} />
                    </div>
                    <div className = "col-6 text-left">
                        <h1 className = "font-weight-bold">{currentUser.firstName} {currentUser.lastName}</h1>
                        <h3>{currentUser.specialization}</h3>
                        <h3>{currentUser.hospitalName}</h3>
                        {currentUser.supportsCovidCare ? (
                            <h3>Supports COVID-19 care</h3>
                        ):(
                            <h3>Does not support COVID-19 care</h3>
                        )}
                        
                    </div>
                    <div className = "col-3 text-left">
                    {this.props.security.user.userType == "PAT" ? (
                        /*<Link to={`/schedule-appointment/${currentUser.userId}`}>*/
                        <Link to={`/form/${currentUser.userId}`}>
                            <button className="col my-1 button-primary button-card">
                                Make Appointment
                            </button>
                        </Link>
                    ) : (<span/>)}
                        
                        <Link to={{pathname: `/view-map/`, latitude: currentUser.latitude, longitude: currentUser.longitude }}>
                            <button className="col my-1 button-secondary button-card">
                                Show Directions
                            </button>
                        </Link>
                    </div>
                    <div className="row pt-3 pl-5">
                        <div className = "col- text-left">
                            <h1>Reviews</h1>
                            <h3>0 Stars | 0 Reviews</h3>
                        </div>
                    </div>
                </div>
                
                {/*Show Google Map and pass doctor's location*
                <br/>
                <p className="text-left bold">View the Location of This Doctor</p>
                    <MapContainer lat={currentUser.latitude} lng={currentUser.longitude}/>*/}
            </div>
        );
    }
}



DoctorAccount.propTypes = {
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

export default connect(mapStateToProps, { getCurrentUser, validateUser })(DoctorAccount);