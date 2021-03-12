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
            {/*<!--span>
                <td style={{backgroundColor: "#a234be"}} className="my-nav-td">
                    <Link to="/choose-role" className="my-nav-link">
                        Sign Up
                    </Link>
                </td>
                <td style={{backgroundColor: "#324521"}} className="my-nav-td">
                    <Link to="/login" className="my-nav-link">
                        Login
                    </Link>
                </td>
            </span-->*/}
            
                <li style={{}}>
                    <Link className="nav-item nav-link" style={{color: "white"}} to="/choose-role">
                        Sign Up
                    </Link>
                </li>
                <li style={{}}>
                    <Link className="nav-item nav-link" style={{color: "white"}} to="/login">
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
            <table style={{backgroundColor: "#00aa95", height: "100%", marginBottom: "36px"}}>
                <tr>
                    <td style={{height: "calc(48px + 2vmin)", width: "10vh"}}>
                        <Link to="/">
                            {<img style={{marginLeft: "calc(16px + 1vmin)", height: "calc(48px + 2vmin)", width: "auto"}} src={vitaLogoWhite}/>}
                        </Link>
                    </td>
                    {headerLinks}
                </tr>
            </table>
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
