import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/securityActions";
import vitaLogoWhite from "../static/vitaLogoWhite.png";

class Header extends Component {
    logout() {
        this.props.logout();
        window.location.href = "/";
    }

    render() {
        const { validToken, user } = this.props.security;

        const userIsAuthenticated = (
            <div>
                <ul class="navbar-nav ml-auto">
                    <li>
                        <Link className="nav-item nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-item nav-link" to="/find-doctors">
                            Find Doctors
                        </Link>
                    </li>
                    <li>
                        <span className="nav-item nav-link">
                            {user.email}
                        </span>
                    </li>
                    <li>
                        <Link
                            className="nav-item nav-link"
                            to="/logout"
                            onClick={this.logout.bind(this)}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        );

        const userIsNotAuthenticated = (
            <ul class="navbar-nav ml-auto">
                <li>
                    <Link className="nav-item nav-link" to="/choose-role">
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link className="nav-item nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        let headerLinks;

        if (validToken && user) {
            headerLinks = userIsAuthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }

        return (
            <header class="header-area overlay">
                <nav class="navbar navbar-expand-md navbar-dark">
                    <div class="container">
                        <Link to="/" class="navbar-brand">
                            {<img src={vitaLogoWhite} style = {{width:'30%'}}/>}
                        </Link>
                        <div id="main-nav" class="collapse navbar-collapse">
                            {headerLinks}
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
