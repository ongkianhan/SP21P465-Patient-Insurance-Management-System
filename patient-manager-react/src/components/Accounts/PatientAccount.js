import React, { Component } from "react";
import { createNewUser, validateUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getCurrentUser } from "../../actions/userActions";
import defaultProfileIcon from "../../static/defaultProfileIcon.png";
import { Link } from "react-router-dom";
import { DOC, PAT, INS } from "../../actions/userRoles";

class PatientAccount extends Component {
    constructor() {
        super();
    }

    render() {
        const { currentUser } = this.props.currentUser;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <img className="col" src={defaultProfileIcon} />
                    </div>
                    <div className="col-9 text-left">
                        <h1 className="font-weight-bold">
                            {currentUser.firstName} {currentUser.lastName}
                        </h1>
                        <h3>
                            Chat name: {currentUser.email}
                        </h3>
                        <h3>
                            Age: {currentUser.age}
                        </h3>
                        <h3>
                            Height: {currentUser.height}
                        </h3>
                        <h3>
                            Weight: {currentUser.weight} lbs
                        </h3>

                        {/* If the patient drinks or smokes, show relevant message(s) */}
                        {currentUser.drinking ? (
                            <h3>Drinks alcohol</h3>
                        ) : (
                            <span />
                        )}
                        {currentUser.smoking ? <h3>Smokes</h3> : <span />}
                    </div>
                </div>
                <div className="row">
                    <div className="col-9 text-left">
                        <h3>
                            Medical History: {currentUser.medicalHistory}
                        </h3>
                        {/* If the user is a doctor, show the patient's allergies */}
                        {this.props.security.user.userType == DOC ? (
                            <h3>Drinks alcohol</h3>
                        ) : (
                            <span />
                        )}
                    </div>
                </div>
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
    errors: state.errors,
});

export default connect(mapStateToProps, { getCurrentUser, validateUser })(
    PatientAccount
);
