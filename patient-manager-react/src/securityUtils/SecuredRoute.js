import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * The SecuredRoute object shows either the target component or the login screen
 * if the user is not signed in (because their token is invalid).
 * Significant credit to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 */
const SecuredRoute = ({ component: Component, security, ...otherProps }) => (
    //Check if the user's type matches the requirement

    //If the user is logged in, show the target Component.
    //Otherwise, redirect them to Login.js
    <Route
        {...otherProps} /* pass the path and other props */
        render={(props) =>
            /* First, check if the user type is correct */
            security.validToken === true ? (
                /* If token is valid, check if the user's type is correct */
                security.user.userType != "" ? (
                    /* If the user type is valid, show target component */
                    <Component {...props} />
                ) : (
                    /* If the user type is incorrect, show the dashboard */
                    <Redirect to="/choose-role" />
                )
            ) : (
                /* If token is invalid or non-existent, show login component */
                <Redirect to="/login" />
            )
        }
    />
);

const SecuredRoutey = ({ component: Component, security, ...otherProps }) => (
    //If the user is logged in, show the target Component.
    //Otherwise, redirect them to Login.js
    <Route
        {...otherProps}
        render = {props =>
        security.validToken === true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
        }
    />
);

SecuredRoute.propTypes = {
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps)(SecuredRoute);
