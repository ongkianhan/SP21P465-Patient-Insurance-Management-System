import React, { Component } from "react";
import { createNewPatient } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";
import { Link } from "react-router-dom";

class Register extends Component 
{
    constructor() 
    {
        super();

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            specialization: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() 
    {
        //Instantly bring the user to their dashboard
        //if they are already logged in
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //When submitting, create the patient
    onSubmit(e) 
    {
        //Create the account
        e.preventDefault();
        const newPatient = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            specialization: this.state.specialization,
            errors: {}
        };
        this.props.createNewPatient(newPatient, this.props.history);

        /*/Automatically login
        const LoginRequest = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.login(LoginRequest);
        //Navigate to the dashboard
        this.props.history.push("/dashboard");*/
    }

    onChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    render()
    {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                        <div className="text-left" style={{paddingTop:'2%'}}>
                                <Link className="h1" to='/choose-role' style={{color:'Green'}}><strong style = {{fontFamily:'Titillium Web'}}>&lt; Go back to role selection</strong></Link>
                            </div>
                            <h1 className="display-4 text-left" style={{paddingTop:'2%', paddingBottom:'2%'}}>Create an account</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg", {"is-invalid": errors.email}
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
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg", {"is-invalid": errors.password}
                                        )}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg", {"is-invalid": errors.firstName}
                                        )}
                                        placeholder="First name"
                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={this.onChange}
                                    />
                                    {errors.firstName && (
                                        <div className="invalid-feedback">
                                            {errors.firstName}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg", {"is-invalid": errors.lastName}
                                        )}
                                        placeholder="Last name"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.onChange}
                                    />
                                    {errors.lastName && (
                                        <div className="invalid-feedback">
                                            {errors.lastName}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg", {"is-invalid": errors.specialization}
                                        )}
                                        placeholder="Specialization"
                                        name="specialization"
                                        value={this.state.specialization}
                                        onChange={this.onChange}
                                    />
                                    {errors.specialization && (
                                        <div className="invalid-feedback">
                                            {errors.specialization}
                                        </div>
                                    )}
                                </div>
                                
                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    createNewPatient: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    security: state.security,
});

export default connect(mapStateToProps, { createNewPatient, login })(Register);
