import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";


class Dashboard extends Component
{
    constructor()
    {
        super();
    }

    render() {
        return (
            <div>
                <h1>Welcome to the Insurer Dashboard</h1>
                <p>{/*this.props.security.user.userType*/}</p>
            </div>
        )
    }
}

Dashboard.propTypes = {
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps)(Dashboard);