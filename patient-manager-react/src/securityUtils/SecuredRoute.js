import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * The SecuredRoute object shows either the target component or the login screen
 * if the user is not signed in (because their token is invalid).
 * Significant credit to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 * for the token validation.
 */
export function SecuredRoute({ component: Component, security, userTypeBlacklist, ...otherProps })
{
    //Check if the user is not allowed on this page
    if (userTypeBlacklist != undefined)
    {
        //If the user's type is not allowed to access this component
        //because it is passed in the blaclist array...
        if (userTypeBlacklist.indexOf(security.user.userType) > -1)
        {
            //Redirect the user
            return <Route {...otherProps} render={(props) => <Redirect to="/permission-denied"/>} />
        }
    }

    //Show either the component or the login form
    return <Route
        {...otherProps} /* pass the path and other props */
        render={(props) =>
            /* First, check if the user type is correct */
            security.validToken === true ? (
                /* Show target component */
                <Component {...props} />
            ) : (
                /* If token is invalid or non-existent, show login component */
                <Redirect to="/login" />
            )
        }
    />
}

SecuredRoute.propTypes = {
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps)(SecuredRoute);
