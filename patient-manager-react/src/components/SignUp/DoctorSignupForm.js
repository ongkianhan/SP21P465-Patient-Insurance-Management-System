import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login, validateUser } from "../../actions/securityActions";
import { Link } from "react-router-dom";

class DoctorSignupForm extends Component {
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

    componentDidMount() {
        //Instantly bring the user to their dashboard
        //if they are already logged in
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //When submitting, create the doctor
    async onSubmit(e) {
        e.preventDefault();
        //Create a new doctor account
        const newDoctor = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            specialization: this.state.specialization,
            hospitalName: this.state.hospitalName,
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
            //Automatically login
            const LoginRequest = {
                email: this.state.email,
                password: this.state.password,
            };
            await this.props.login(LoginRequest);
            //Navigate to the dashboard
            this.props.history.push("/doctor-dashboard");
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
                                Create an account
                            </h1>

                            <div className="thin-container">
                                <p className="thin-container-title text-center">
                                    Sign up as Doctor
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
                                            value="Create Account"
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

DoctorSignupForm.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    validateUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    security: state.security,
});

export default connect(mapStateToProps, { createNewUser, login, validateUser })(DoctorSignupForm);
