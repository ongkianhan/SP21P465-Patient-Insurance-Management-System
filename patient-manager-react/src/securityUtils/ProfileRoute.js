import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DoctorProfileEditor from "../components/Profiles/DoctorProfileEditor";
import PatientProfileEditor from "../components/Profiles/PatientProfileEditor";
import InsurerProfileEditor from "../components/Profiles/InsurerProfileEditor";
import { DOC, PAT, INS } from "../actions/userRoles";


/**
 * Shows the correct dashboard component based on the user's role
 */
export function ProfileRoute({security, ...otherProps})
{
    var outputComponent = null;
    switch (security.user.userType) 
    {
        case DOC:
            outputComponent = DoctorProfileEditor;
            break;
        case PAT:
            outputComponent = PatientProfileEditor;
            break;
        case INS:
            outputComponent = InsurerProfileEditor;
            break;
    }

    return <Route
        {...otherProps} /* pass the path and other props */
        component={outputComponent}
    />
}

ProfileRoute.propTypes = {
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps)(ProfileRoute);