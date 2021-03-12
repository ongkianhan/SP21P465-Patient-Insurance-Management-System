import React, { Component } from "react";
import { createNewInsurer } from "../../actions/securityActions";
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
            firmName: "",
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

    //When submitting, create the insurer
    onSubmit(e) 
    {
        //Create the account
        e.preventDefault();
        const newInsurer = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            firmName: this.state.firmName,
            errors: {}
        };
        this.props.createNewInsurer(newInsurer, this.props.history);

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
                        <div className="col-md-12">
                            {/*Header*/}
                            <div className="text-left" style={{paddingTop:'2%'}}>
                                <Link to='/choose-role' style={{color:'Green'}}><strong style = {{fontFamily:'Titillium Web'}}>&lt; Go back to role selection</strong></Link>
                            </div>
                            <h1 className="display-4 text-left page-header">Create an account</h1>

                            <div className="thin-container">
                                <p className="thin-container-title text-center">Sign up as an Insurance Provider</p>

                                <form onSubmit={this.onSubmit}>    
                                    {/*Column 1*/}
                                    <table>
                                        {/*Row 1*/}
                                        <tr>
                                            <td>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={classnames(
                                                        "form-control textbox", {"is-invalid": errors.email}
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
                                            <td>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className={classnames(
                                                        "form-control textbox", {"is-invalid": errors.password}
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
                                            </td>
                                        </tr>
                                        {/*Row 2*/}
                                        <tr>
                                            <td>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={classnames(
                                                        "form-control textbox", {"is-invalid": errors.firstName}
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
                                            </td>
                                            <td>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={classnames(
                                                        "form-control textbox", {"is-invalid": errors.lastName}
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
                                            </td>
                                        </tr>
                                        {/*Row 3*/}
                                        <tr>
                                            <td>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={classnames(
                                                        "form-control textbox", {"is-invalid": errors.firmName}
                                                    )}
                                                    placeholder="Company name"
                                                    name="firmName"
                                                    value={this.state.firmName}
                                                    onChange={this.onChange}
                                                />
                                                {errors.firmName && (
                                                    <div className="invalid-feedback">
                                                        {errors.firmName}
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

Register.propTypes = {
    createNewInsurer: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    security: state.security,
});

export default connect(mapStateToProps, { createNewInsurer, login })(Register);
