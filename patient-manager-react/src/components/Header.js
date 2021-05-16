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
            <span>
                {
                    /* Only patients should see the doctor finder */
                    this.props.security.user.userType == "PAT" ? (
                        <li className="nav-item">
                            <Link to="/find-doctors" className="nav-link">
                                Find Doctors
                            </Link>
                        </li>
                    ) : /* Only insurers should see the patient finder */
                    this.props.security.user.userType == "INS" ? (
                        <li className="nav-item">
                            <Link to="/find-patients" className="nav-link">
                                Find Patients
                            </Link>
                        </li>
                    ) : (
                        <span />
                    )
                }

                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/chat`} className="nav-link">
                        Chat
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${user.userId}`} className="nav-link">
                        Profile
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" onClick={this.logout.bind(this)}>
                        Logout
                    </Link>
                </li>
            </span>
        );

        const userIsNotAuthenticated = (
            <span>
                <li className="nav-item">
                    <Link to="/choose-role" className="nav-link">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </span>
        );

        let headerLinks;

        if (validToken && user) {
            headerLinks = userIsAuthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }

        return (
            <span>
                <nav className="nav-horizontal">
                    <div className="nav-container">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link to="/">
                                    <img
                                        style={{
                                            paddingTop: "1vmin",
                                            paddingBottom: "1.25vmin",
                                            minHeight: "calc(48px + 2vmin)",
                                            maxHeight: "100%",
                                            width: "auto",
                                        }}
                                        src={vitaLogoWhite}
                                    />
                                </Link>
                            </li>
                            {headerLinks}
                        </ul>
                    </div>
                </nav>
            </span>
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
