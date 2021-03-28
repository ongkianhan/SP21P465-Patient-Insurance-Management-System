import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DoctorDashboard from "../components/Dashboards/DoctorDashboard";
import PatientDashboard from "../components/Dashboards/PatientDashboard";
import InsurerDashboard from "../components/Dashboards/InsurerDashboard";
import { DOC, PAT, INS } from "../actions/userRoles";


/**
 * Shows the correct dashboard component based on the user's role
 */
export function DashboardRoute({security, ...otherProps})
{
    var outputDashboard = null;
    switch (security.user.userType) 
    {
        case DOC:
            outputDashboard = DoctorDashboard;
            break;
        case PAT:
            outputDashboard = PatientDashboard;
            break;
        case INS:
            outputDashboard = InsurerDashboard;
            break;
    }

    return <Route
        {...otherProps} /* pass the path and other props */
        component={outputDashboard}
    />
}

DashboardRoute.propTypes = {
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps)(DashboardRoute);