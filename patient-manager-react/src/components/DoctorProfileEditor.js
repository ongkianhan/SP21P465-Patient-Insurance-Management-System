import React, { Component } from "react";
import { createNewUser, validateUser } from "../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../actions/userActions";

class DoctorProfileEditor extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            specialization: "",
            hospitalName: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount()
    {
        //Make a request to get all the user's info from the database
        const userId = this.props.security.user.userId;
        this.props.getCurrentUser(userId, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        //Set the state to the current user's info so that
        //it shows on the page
        const {
            email,
            password,
            firstName,
            lastName,
            specialization,
            hospitalName
        } = nextProps.currentUser;
        this.setState({
            email,
            password,
            firstName,
            lastName,
            specialization,
            hospitalName
        });
    }

    //When submitting, create the doctor
    async onSubmit(e) {
        e.preventDefault();
        //Create a new doctor account
        const newDoctor = {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            specialization: this.specialization,
            hospitalName: this.hospitalName,
            errors: {},
        };
    
        //Validate the user
        const frontEndErrors = validateUser(newDoctor)
        if (Object.keys(frontEndErrors).length != 0) //if errors exist
        {
            this.setState({ errors: frontEndErrors });
            return;
        }

        //Send the signup request
        await this.props.createNewUser(newDoctor, "doctor", this.props.history, this.props.login);

        if (Object.keys(this.state.errors).length == 0) //if no errors exist
        {
            //Do something
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/*Header*/}
                            <div
                                className="text-left"
                                style={{ paddingTop: "2%" }}
                            >
                                <Link
                                    to="/choose-role"
                                    style={{ color: "Green" }}
                                >
                                    <strong
                                        style={{ fontFamily: "Titillium Web" }}
                                    >
                                        &lt; Go back to role selection
                                    </strong>
                                </Link>
                            </div>
                            <h1 className="display-4 text-left page-header">
                                Your Profile
                            </h1>

                            <div className="thin-container">
                                <p className="thin-container-title text-center">
                                    Edit Your Profile
                                </p>

                                <form onSubmit={this.onSubmit}>
                                    {/*Column 1*/}
                                    <table>
                                        {/*Row 1*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.email,
                                                            }
                                                        )}
                                                        placeholder="Email address"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.email && (
                                                        <div className="invalid-feedback">
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.password,
                                                            }
                                                        )}
                                                        placeholder="Password"
                                                        name="password"
                                                        value={
                                                            this.state.password
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.password && (
                                                        <div className="invalid-feedback">
                                                            {errors.password}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        {/*Row 2*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.firstName,
                                                            }
                                                        )}
                                                        placeholder="First name"
                                                        name="firstName"
                                                        value={
                                                            this.state.firstName
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.firstName && (
                                                        <div className="invalid-feedback">
                                                            {errors.firstName}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.lastName,
                                                            }
                                                        )}
                                                        placeholder="Last name"
                                                        name="lastName"
                                                        value={
                                                            this.state.lastName
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.lastName && (
                                                        <div className="invalid-feedback">
                                                            {errors.lastName}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        {/*Row 3*/}
                                        <tr>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.specialization,
                                                            }
                                                        )}
                                                        placeholder="Specialization"
                                                        name="specialization"
                                                        value={
                                                            this.state.specialization
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.specialization && (
                                                        <div className="invalid-feedback">
                                                            {errors.specialization}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="td-textbox-holder">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className={classnames(
                                                            "form-control textbox",
                                                            {
                                                                "is-invalid":
                                                                    errors.hospitalName,
                                                            }
                                                        )}
                                                        placeholder="Hospital name"
                                                        name="hospitalName"
                                                        value={
                                                            this.state.hospitalName
                                                        }
                                                        onChange={this.onChange}
                                                    />
                                                    {errors.hospitalName && (
                                                        <div className="invalid-feedback">
                                                            {
                                                                errors.hospitalName
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    {/*Submit button*/}
                                    <div className="row justify-content-center">
                                        <input
                                            type="submit"
                                            className="button-submit button-primary"
                                            value="Update Account"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DoctorProfileEditor.propTypes = {
    createNewUser: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { createNewUser, getCurrentUser, validateUser })(DoctorProfileEditor);